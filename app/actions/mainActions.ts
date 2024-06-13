"use server"
import prisma from "@/lib/db"
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath, revalidateTag } from "next/cache";
import { mainSchema } from "@/lib/mainTypes";
const fs = require('fs');
 
export  const getMain  = async () => {
   try {
     return await prisma.main.findFirst();
   } catch (e) {
      throw e
   } 
}
 
// Для update
export  const getUniqueMain  = async (id: number) => {
   try {
     return await prisma.main.findUnique({
      where: { id }
     });
   } catch (e) {
      throw e
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
      throw e
   } 
}

export async function createMain(prevState: any, values: FormData) {
   
   // Валидация формы
   const result = mainSchema.safeParse({
      title: values.get('title'),
      content: values.get('content')
   })
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
         text: errorMessage.length !== 0 ? errorMessage : 'Что-то пошло не так'
      }}
   }

   try {
      // Получаем картинки в массив
      for (const pair of values.entries()) {        
         if (pair[0] === 'gallery' && pair[1].size) {
            fileArr.push(pair[1])
         }
       }

      // Путь для папки
      const relativeUploadDir = `/images/main`;
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
           throw new Error('Что-то пошло не так.')
         }
       }

      // загружаем картинку в public
      for (const item of fileArr) {
         const fileName = uuidv4() + '.jpg'
         const bytes =  await item.arrayBuffer()
         // console.log('bytes', bytes);
         
         const bufffer = Buffer.from(bytes)

         // console.log('buffer', bufffer);
         await writeFile(`${uploadDir}/${fileName}`, bufffer)
         console.log(`откройте ${uploadDir} чтобы увидеть загруженные файлы`);
         arrNames.push(fileName)
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
      let errorMessage = '';
      if (!result.success) {
         result.error.issues.forEach(issue => {
            errorMessage = errorMessage + issue.path[0] + ': ' + issue.message + '. ';
         });
      }
      return {message: {
         status: 'error',
         text: errorMessage.length !== 0 ? errorMessage : 'Что-то пошло не так'
      }}
   }
}

export  const deleteMain  = async (id: number) => {

   // Пути для картинок
   const relativeUploadDir = `/images/main`;
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
      revalidatePath('/admin')
   } catch (e) {
      throw e
   }
}

export  const updateMain  = async ( updateId: number, prevState: any, values: FormData)  => {
   // Парсим через схему Zoda в result
   const result = mainSchema.safeParse({
      title: values.get('title'),
      content: values.get('content')
   })
   
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
         text: errorMessage.length !== 0 ? errorMessage : 'Что-то пошло не так'
      }}
   }

   // Путь для папки
   const relativeUploadDir = `/images/main`;
   const uploadDir = join(process.cwd(), "public/", relativeUploadDir);

   try {
      // Получаем массив картинок
      for (const pair of values.entries()) {
         if (pair[0] === 'gallery') {
            fileArr.push(pair[1])
         }
       }
      if (fileArr.length === 0) {
         throw new Error('No file to uploaded')
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
      for (const item of fileArr) {
         const fileName = uuidv4() + '.jpg'
         const bytes =  await item.arrayBuffer()
         const bufffer = Buffer.from(bytes)
         await writeFile(`${uploadDir}/${fileName}`, bufffer)
         console.log(`откройте ${uploadDir} чтобы увидеть загруженные файлы`);
         arrNames.push(fileName)
      }

      // Загружаем данные в БД
      await prisma.main.update({
         where: { id: updateId },
         data: {
            title: result.data?.title as string,
            content: result.data?.content as string,
            gallery: arrNames,
         }
      })

      return {message: {
         status: 'success',
         text: 'Данные успешно обновлены'
      }}
   } catch (e) {
      let errorMessage = '';
      if (!result.success) {
         result.error.issues.forEach(issue => {
            errorMessage = errorMessage + issue.path[0] + ': ' + issue.message + '. ';
         });
         }
      return {message: {
         status: 'error',
         text: errorMessage.length !== 0 ? errorMessage : 'Что-то пошло не так'
      }}
   }
}