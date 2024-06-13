// "use server"
// import { News } from "@/types/news";
 
// export  const getNews  = async () => {
//    try {
//      return await prisma.news.findMany();
//    } catch (e) {
//       throw e
//    } 
//    // finally {
//    //    await prisma.$disconnect()
//    // }
// }

// export async function createNews(values: News) {
//    try {
//       await prisma.news.create({
//          data: {
//             title: values.title,
//             content: values.content,
//             thumbnail: '123123'
//          }
//       })
//    } catch (e) {
//       throw(e)
//    }
// }


// ---------------------------------------------------------

"use server"
import prisma from "@/lib/db"
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { v4 as uuidv4 } from 'uuid';
// import { revalidatePath, revalidateTag } from "next/cache";
import { mainSchema } from "@/lib/mainTypes";
const fs = require('fs');
 
export  const getNews  = async () => {
   try {
     return await prisma.news.findFirst();
   } catch (e) {
      throw e
   } 
}
 
// Для update
export  const getUnique  = async (id: number) => {
   try {
     return await prisma.news.findUnique({
      where: { id }
     });
   } catch (e) {
      throw e
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
      throw e
   } 
}

export async function createNews(prevState: any, values: FormData) {
   // Валидация формы
   const result = mainSchema.safeParse({
      title: values.get('title'),
      content: values.get('content')
   })
   let fileArr: any[] = []
   let arrNames: string[] = []

   // console.log(result);
   

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
         if (pair[0] === 'thumbnail' && pair[1].size) {
            fileArr.push(pair[1])
         }
       }

      // if (fileArr.length === 0) {
      //    throw new Error('No file to uploaded')
      // }

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
           throw new Error('Что-то пошло не так.')
         }
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

      // console.log(result.data.title);
      // console.log(result.data.content);

      // Загружаем данные в БД
      await prisma.news.create({
         data: {
            title: result.data?.title as string,
            content: result.data?.content as string,
            thumbnail: arrNames,
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

export  const deleteNews  = async (id: number) => {

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

      await prisma.news.delete({
         where: { id }
      });
      // revalidatePath('/admin')
   } catch (e) {
      throw e
   }
}

export  const updateNews  = async ( updateId: number, prevState: any, values: FormData)  => {
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
   const relativeUploadDir = `/images/news`;
   const uploadDir = join(process.cwd(), "public/", relativeUploadDir);

   try {
      // Получаем массив картинок
      for (const pair of values.entries()) {
         if (pair[0] === 'thumbnail') {
            fileArr.push(pair[1])
         }
       }
      if (fileArr.length === 0) {
         throw new Error('No file to uploaded')
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

      // Создаем папку
      // try {
      //    await stat(uploadDir);
      //  } catch (e: any) {
      //    if (e.code === "ENOENT") {
      //      await mkdir(uploadDir, { recursive: true });
      //    } else {
      //      console.error(
      //        "Ошибка при попытке создать каталог при загрузке файла\n",
      //        e
      //      );
      //      throw new Error('Что-то пошло не так.')
      //    }
      //  }

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
      await prisma.news.update({
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