"use server"
import prisma from "@/lib/db"
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { v4 as uuidv4 } from 'uuid';
import { downloadSchema } from "@/lib/downloadTypes";
import fs from 'fs';
 
export  const getDownload  = async () => {
   try {
     return await prisma.download.findFirst();
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   } 
}
 
// Для update
export  const getUnique  = async (id: number) => {
   try {
     return await prisma.download.findUnique({
      where: { id }
     });
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   } 
}
 
export  const getDownloadAll  = async () => {
   try {
     return await prisma.download.findMany({
      orderBy: {
         createdAt: "desc"
      }
     });
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   } 
}

export async function createDownload(prevState: any, values: FormData) {
   // Валидация формы
   const result = downloadSchema.safeParse({
      file: values.get('file'),
   })
   let fileName = ''
   let shortFileName = ''
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
      // Получаем файл в массив
      for (const pair of values.entries()) {
         if (pair[0] === 'file' && pair[1].size) {
            fileArr.push(pair[1])
            fileName = pair[1].name
         }
       }

      // Путь для папки
      const relativeUploadDir = `/files`;
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
            // const fileName = uuidv4() + '.jpg'
            const bytes =  await item.arrayBuffer()
            const bufffer = Buffer.from(bytes)
            await writeFile(`${uploadDir}/${fileName}`, bufffer)
            console.log(`откройте ${uploadDir} чтобы увидеть загруженные файлы`);
            arrNames.push(fileName)
         }
      }

      // Убираем расширение файла, для создания пути для брейкпоинта Api
      shortFileName = fileName.slice(fileName.lastIndexOf('=') + 1).toLowerCase()

      // Загружаем данные в БД
      await prisma.download.create({
         data: {
            title: result.data.title as string,
            content: result.data.content as string,
            name: result.data.name as string,
            path: `/api/download/${shortFileName}`
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

export  const deleteDownload  = async (id: number) => {
   // Пути для картинок
   const relativeUploadDir = `/images/news`;
   const uploadDir = join(process.cwd(), "public/", relativeUploadDir);
   try {
      const data = await getUnique(id)
      const imgArr = data?.thumbnail

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

      await prisma.download.delete({
         where: { id }
      });
   } catch (e) {
      console.error('Не удалось удалить запись')
   }
}

export  const updateDownload  = async ( updateId: number, prevState: any, values: FormData)  => {
   // Парсим через схему Zoda в result
   const result = downloadSchema.safeParse({
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
         if (pair[0] === 'thumbnail') {
            fileArr.push(pair[1])
         }
       }

      // Удаляем старую картинку, если есть новая
      if (fileArr.length !== 0) {
         const data = await getUnique(updateId)
         const imgArr = data?.thumbnail
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

      // Загружаем данные в БД
      await prisma.download.update({
         where: { id: updateId },
         data: {
            title: result.data?.title as string,
            content: result.data?.content as string,
            thumbnail: arrNames,
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