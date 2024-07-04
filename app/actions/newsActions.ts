"use server"
import prisma from "@/lib/db"
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { v4 as uuidv4 } from 'uuid';
import { newsSchema } from "@/lib/newsTypes";
import { newsUpdateSchema } from "@/lib/newsUpdateTypes";
import fs from 'fs';
 
export  const getNews  = async () => {
   try {
     return await prisma.news.findFirst();
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   } 
}
 
// Для update
export  const getUnique  = async (id: number) => {
   try {
     return await prisma.news.findUnique({
      where: { id }
     });
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   } 
}
 
export  const getNewsAll  = async () => {
   try {
     return await prisma.news.findMany({
      orderBy: {
         createdAt: "desc"
      }
     });
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   } 
}
 
export  const getOnNewsPage  = async (take: number) => {
   try {
     return await prisma.news.findMany({
      take: take,
      orderBy: {
         createdAt: "desc"
      }
     });
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   } 
}

export async function createNews(prevState: any, values: FormData) {
   // Валидация формы
   const result = newsSchema.safeParse({
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
         text: errorMessage.length !== 0 ? errorMessage : 'Ошибка валидации'
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
      const relativeUploadDir = `/images/news`;
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
      await prisma.news.create({
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
         result.error.issues.forEach((issue: { path: string[]; message: string; }) => {
            errorMessage = errorMessage + issue.path[0] + ': ' + issue.message + '. ';
         });
      }
      return {message: {
         status: 'error',
         text: errorMessage.length !== 0 ? errorMessage : 'Что-то пошло не так'
      }}
   }
}

export  const deleteNews  = async (id: number) => {
   // Пути для картинок
   const relativeUploadDir = `/images/news`;
   const uploadDir = join(process.cwd(), "public/", relativeUploadDir);
   try {
      const data = await getUnique(id)
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

      await prisma.news.delete({
         where: { id }
      });
   } catch (e) {
      console.error('Не удалось удалить запись')
   }
}

export  const updateNews  = async ( updateId: number, prevState: any, values: FormData)  => {
   // Парсим через схему Zoda в result
   const result = newsUpdateSchema.safeParse({
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
         text: errorMessage.length !== 0 ? errorMessage : 'Ошибка валидации'
      }}
   }

   // Путь для папки
   const relativeUploadDir = `/images/news`;
   const uploadDir = join(process.cwd(), "public/", relativeUploadDir);

   try {
      // Получаем массив картинок
      for (const pair of values.entries()) {
         if (pair[0] === 'gallery' && pair[1].size) {
            fileArr.push(pair[1])
         }
       }

      // Удаляем старую картинку, если есть новая
      if (fileArr.length !== 0) {
         const data = await getUnique(updateId)
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
     // Оставляем только не пустые данные в объекте
     let finallyData = Object.fromEntries(Object.entries(result.data).filter(([key, value]) => value.length > 0))
     if (arrNames.length > 0) {
      finallyData.gallery = arrNames
     }
      // Загружаем данные в БД
      await prisma.news.update({
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
      let errorMessage = '';
      if (!result.success) {
         result.error.issues.forEach((issue: { path: string[]; message: string; }) => {
            errorMessage = errorMessage + issue.path[0] + ': ' + issue.message + '. ';
         });
         }
      return {message: {
         status: 'error',
         text: errorMessage.length !== 0 ? errorMessage : 'Что-то пошло не так'
      }}
   }
}