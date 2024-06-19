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
      title: values.get('title'),
      content: values.get('content'),
      // name: values.get('name'),
      // path: values.get('path'),
   })
   let rawName = ''
   let fileName = ''
   let shortFileName = ''
   let extension = ''
   let fileArr: any[] = []
   let arrNames: string[] = [] 
   let fileArrThumb: any[] = []  
   let arrNamesThumb: string[] = []

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

   // Путь для папки файлов
   const relativeUploadDir = `/files`;
   const uploadDir = join(process.cwd(), "public/", relativeUploadDir);
   // Путь для папки картинок
   const relativeUploadDirThumb = `/images/files`;
   const uploadDirThumb = join(process.cwd(), "public/", relativeUploadDirThumb);

   try {
      // Получаем файл в массив
      for (const pair of values.entries()) {
         if (pair[0] === 'file' && pair[1].size) {
            fileArr.push(pair[1])
            // Исходное наименование файла
            rawName = pair[1].name
            // Расширение файла
            extension = rawName.slice(pair[1].name.indexOf('.')).toLowerCase()
            // Короткое наименование файла без расширения
            shortFileName = rawName.split('.').slice(0, -1).join('.').toLowerCase()
            // Итоговое сгенерированное название файла
            fileName = `${shortFileName}_${uuidv4()}${extension}`
         }
       }
      // Получаем картинку в массив
      for (const pair of values.entries()) {      
         if (pair[0] === 'thumbnail' && pair[1].size) {
            fileArrThumb.push(pair[1])
         }
       }

      // Создаем папку для файлов
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

      // Создаем папку для картинок
      try {
         await stat(uploadDirThumb);
       } catch (e: any) {
         if (e.code === "ENOENT") {
           await mkdir(uploadDirThumb, { recursive: true });
         } else {
           console.error(
             "Ошибка при попытке создать каталог при загрузке файла\n",
             e
           );
         }
       }

      // Загружаем файл в public
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

      // загружаем картинку в public
      if (fileArrThumb.length > 0) {
         for (const item of fileArrThumb) {
            const fileName = uuidv4() + '.jpg'
            const bytes =  await item.arrayBuffer()
            const bufffer = Buffer.from(bytes)
            await writeFile(`${uploadDirThumb}/${fileName}`, bufffer)
            console.log(`откройте ${uploadDirThumb} чтобы увидеть загруженные файлы`);
            arrNamesThumb.push(fileName)
         }
      }

      console.log('fileArrThumb фвцвфцв', fileArrThumb);
      console.log('arrNamesThumb фвцвфцв', arrNamesThumb);
      

      // Загружаем данные в БД
      await prisma.download.create({
         data: {
            title: result.data.title as string,
            content: result.data.content as string,
            name: fileName as string,
            path: `/api/download/`,
            thumbnail: arrNamesThumb,
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
   // Пути для файлов
   const relativeUploadDir = `/files`;
   const uploadDir = join(process.cwd(), "public/", relativeUploadDir);
      // Пути для картинок
   const relativeUploadDirThumb = `/images/files`;
   const uploadDirThumb = join(process.cwd(), "public/", relativeUploadDirThumb);

   try {
      const data = await getUnique(id)
      const file = data?.name
      const thumbnail = data?.thumbnail

      // Проходимся по полученному массиву и удаляем файлы с сервера
      fs.unlink(`${uploadDir}/${file}`, err => {
         if (err) {
            console.log(err);
         } else {
            console.log(`Файл ${file} удален`)
         }
      })
      // Проходимся по полученному массиву и удаляем картинки с сервера
      fs.unlink(`${uploadDirThumb}/${thumbnail}`, err => {
         if (err) {
            console.log(err);
         } else {
            console.log(`Файл ${thumbnail} удален`)
         }
      })
      // Для массива
      // imgArr?.forEach(item => {
      //    fs.unlink(`${uploadDir}/${item}`, err => {
      //       if (err) {
      //          console.log(err);
      //       } else {
      //          console.log(`Файл ${item} удален`)
      //       }
      //    })
      // })

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
   
   let rawName = ''
   let fileName = ''
   let shortFileName = ''
   let extension = ''
   let fileArrThumb: any[] = []
   let fileArr: any[] = []
   let arrNames: string[] = []
   let arrNamesThumb: string[] = []

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
         // Пути для картинок
   const relativeUploadDirThumb = `/images/files`;
   const uploadDirThumb = join(process.cwd(), "public/", relativeUploadDirThumb);


   try {
      // Получаем массив файлов
      for (const pair of values.entries()) {
         if (pair[0] === 'file' && pair[1].size) {
            fileArr.push(pair[1])
         // Исходное наименование файла
         rawName = pair[1].name
         // Расширение файла
         extension = rawName.slice(pair[1].name.indexOf('.')).toLowerCase()
         // Короткое наименование файла без расширения
         shortFileName = rawName.split('.').slice(0, -1).join('.').toLowerCase()
         // Итоговое сгенерированное название файла
         fileName = `${shortFileName}_${uuidv4()}${extension}`
         }
       }
       for (const pair of values.entries()) {        
         if (pair[0] === 'thumbnail' && pair[1].size) {
            fileArrThumb.push(pair[1])
         }
       }

      // Удаляем старый файл, если есть новый
      if (fileArr.length !== 0) {
         const data = await getUnique(updateId)
         const pdfArr = data?.name
         fs.unlink(`${uploadDir}/${pdfArr}`, err => {
            if (err) {
               console.log(err);
            } else {
               console.log(`Файл ${pdfArr} удален`)
            }
         })
         // Для массива
         // pdfArr?.forEach(item => {
         //    fs.unlink(`${uploadDir}/${item}`, err => {
         //       if (err) {
         //          console.log(err);
         //       } else {
         //          console.log(`Файл ${item} удален`)
         //       }
         //    })
         // })
         // Проходимся по полученному массиву и удаляем картинки с сервера
         fileArrThumb.forEach(item => {
            fs.unlink(`${uploadDirThumb}/${item}`, err => {
               if (err) {
                  console.log(err);
               } else {
                  console.log(`Файл ${item} удален`)
               }
            })
         })
      }

      // загружаем файл в public
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

      
      // загружаем картинку в public
      if (fileArrThumb.length > 0) {
         for (const item of fileArrThumb) {
            const fileName = uuidv4() + '.jpg'
            const bytes =  await item.arrayBuffer()
            const bufffer = Buffer.from(bytes)
            await writeFile(`${uploadDirThumb}/${fileName}`, bufffer)
            console.log(`откройте ${uploadDirThumb} чтобы увидеть загруженные файлы`);
            arrNamesThumb.push(fileName)
         }
      }

      // Загружаем данные в БД
      await prisma.download.update({
         where: { id: updateId },
         data: {
            title: result.data.title as string,
            content: result.data.content as string,
            name: fileName as string,
            path: `/api/download/${shortFileName}`,
            thumbnail: arrNamesThumb,
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