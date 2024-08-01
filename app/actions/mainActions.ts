"use server"
import prisma from "@/lib/db"
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { v4 as uuidv4 } from 'uuid';
import { mainSchema } from "@/lib/mainTypes";
import fs from 'fs';
 
export  const getMain  = async () => {
   try {
     return await prisma.main.findFirst();
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   } 
}
 
// Для update
export  const getUniqueMain  = async (id: number) => {
   try {
     return await prisma.main.findUnique({
      where: { id }
     });
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   } 
}
 
export  const getMainAll  = async () => {
   try {
     return await prisma.main.findMany({
      orderBy: {
         createdAt: "desc"
      }
     });
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   } 
}

export async function createMain(prevState: any, values: FormData) {
   // Валидация формы
   const result = mainSchema.safeParse({
      title: values.get('title'),
      content: values.get('content')
   })
   const galleryItem = values.get('gallery') as File
   let fileArr: any[] = []
   let arrNames: string[] = []

   // Выкидваем ошибку после валидации Zodа
   let errorMessage = '';
   if (!result.success) {
      result.error.issues.forEach(issue => {
         errorMessage = errorMessage + issue.path[0] + ': ' + issue.message + '. ';
      });
      return {message: {
         status: 'error',
         text: errorMessage.length !== 0 ? errorMessage : 'Ошибка валидации'
      }}
   }

   try {
      // Получаем картинки в массив
      if (galleryItem.size) {
         fileArr.push(galleryItem)
      }

      // Путь для папки
      const relativeUploadDir = `/images`;
      const uploadDir = join(process.cwd(), "public/", relativeUploadDir);

      // Создаем папку
      try {
         await stat(uploadDir);
       } catch (e: any) {
         if (e.code === "ENOENT") {
           await mkdir(uploadDir, { recursive: true });
         } else {
           console.error(
             "Ошибка при попытке создать каталог при загрузке файла\n",
             e
           );
         }
       }

      // загружаем картинку в public
      if (fileArr.length > 0) {
         for (const item of fileArr) {
            const fileName = uuidv4() + '.jpg'
            const bytes =  await item.arrayBuffer()        
            const bufffer = Buffer.from(bytes)
            await writeFile(`${uploadDir}/${fileName}`, bufffer)
            console.log(`откройте ${uploadDir} чтобы увидеть загруженные файлы`);
            arrNames.push(fileName)
         }
      }

      // Загружаем данные в БД
      await prisma.main.create({
         data: {
            title: result.data?.title as string,
            content: result.data?.content as string,
            gallery: arrNames,
         }
      })

      return {message: {
         status: 'success',
         text: 'Данные успешно загружены'
      }}
   } catch (e) {
      return {message: {
         status: 'error',
         text: `${e}` || 'Что-то пошло не так'
      }}
   }
}

export  const deleteMain  = async (id: number) => {
   // Пути для картинок
   const relativeUploadDir = `/images`;
   const uploadDir = join(process.cwd(), "public/", relativeUploadDir);
   try {
      const data = await getUniqueMain(id)
      const imgArr = data?.gallery

      // Проходимся по полученному массиву и удаляем картинки с сервера
      imgArr?.forEach(item => {
         fs.unlink(`${uploadDir}/${item}`, err => {
            if (err) {
               console.log(err);
            } else {
               console.log(`Файл ${item} удален`)
            }
         })
      })

      await prisma.main.delete({
         where: { id }
      });
   } catch (e) {
      console.error('Не удалось удалить запись')
   }
}

export  const updateMain  = async ( updateId: number, prevState: any, values: FormData)  => {
   // Парсим через схему Zoda в result
   const result = mainSchema.safeParse({
      title: values.get('title'),
      content: values.get('content')
   })
   const galleryItem = values.get('gallery') as File
   let fileArr: any[] = []
   let arrNames: string[] = []

   // Выкидваем ошибку после валидации Zodа
   let errorMessage = '';
   if (!result.success) {
      result.error.issues.forEach(issue => {
         errorMessage = errorMessage + issue.path[0] + ': ' + issue.message + '. ';
      });
      return {message: {
         status: 'error',
         text: errorMessage.length !== 0 ? errorMessage : 'Ошибка валидации'
      }}
   }

   // Путь для папки
   const relativeUploadDir = `/images`;
   const uploadDir = join(process.cwd(), "public/", relativeUploadDir);

   try {
      // Получаем массив картинок
      if (galleryItem.size) {
         fileArr.push(galleryItem)
      }
      // Удаляем старую картинку, если есть новая
      if (fileArr.length !== 0) {
         const data = await getUniqueMain(updateId)
         const imgArr = data?.gallery
         imgArr?.forEach(item => {
            fs.unlink(`${uploadDir}/${item}`, err => {
               if (err) {
                  console.log(err);
               } else {
                  console.log(`Файл ${item} удален`)
               }
            })
         })
      }

      // загружаем картинку в public
      if (fileArr.length > 0) {
         for (const item of fileArr) {
            const fileName = uuidv4() + '.jpg'
            const bytes =  await item.arrayBuffer()
            const bufffer = Buffer.from(bytes)
            await writeFile(`${uploadDir}/${fileName}`, bufffer)
            console.log(`откройте ${uploadDir} чтобы увидеть загруженные файлы`);
            arrNames.push(fileName)
         }
      }


      let finallyData = Object.fromEntries(Object.entries(result.data).filter(([key, value]) => value.length > 0))
      if (arrNames.length > 0) {
         finallyData.gallery = arrNames[0]
      }
      // Загружаем данные в БД
      await prisma.main.update({
         where: { id: updateId },
         data: {
            ...finallyData
         }
      })

      return {message: {
         status: 'success',
         text: 'Данные успешно обновлены'
      }}
   } catch (e) {
      return {message: {
         status: 'error',
         text: e || 'Что-то пошло не так'
      }}
   }
}