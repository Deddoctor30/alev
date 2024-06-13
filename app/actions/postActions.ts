"use server"
import { Post } from "@prisma/client"
import prisma from "@/lib/db"
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from "next/cache";
import { postsSchema } from "@/lib/postsTypes";
const fs = require('fs');
 
export  const getPosts  = async () => {
  try {
    return await prisma.post.findMany({
        include: {
           author: true
        },
        orderBy: {
          createdAt: "desc"
       }
       });
  } catch (e) {
     throw e
  } 
}

// Для update
export  const getUniquePosts  = async (id: number) => {
  try {
    return await prisma.post.findUnique({
     where: { id }
    });
  } catch (e) {
     throw e
  } 
}

// export async function createPosts(values: Post) {
//   try {
//     await prisma.post.create({
//       data: {
//         title: values.title,
//         content: values.content,
//         gip: values.gip,
//         gap: values.gap,
//         thumbnail: values.thumbnail,
//         gallery: values.gallery,
//         type: values.type
//       },
//     })
//     revalidatePath('/admin')
//   } catch (e) {
//     throw(e)
//   } 
//   // finally {
//   //   await prisma.$disconnect()
//   // }
// }
 
// export async function updatePosts(values: Post) {
//   try {
//     await prisma.post.update({
//       where: { id: values.id },
//       data: {
//         title: values.title,
//         content: values.content,
//         thumbnail: values.thumbnail,
//         gallery: values.gallery,
//         type: values.type
//       },
//     })
//   } catch (e) {
//     throw(e)
//   } 
//   // finally {
//   //   await prisma.$disconnect()
//   // }
// }
 
// export async function deletePosts(values: Post) {
//   try {
//     await prisma.post.delete({ where: { id: values.id } })
//   } catch (e) {
//     throw(e)
//   } 
//   // finally {
//   //   await prisma.$disconnect()
//   // }
// }



export async function createPosts(prevState: any, values: FormData) {
   
  
  // Валидация формы
  const result = postsSchema.safeParse({
    title: values.get('title'),
    content: values.get('content'),
    gip: values.get('gip'),
    gap: values.get('gap'),
    type: values.get('type')
  })
  let fileArrThumb: any[] = []
  let fileArrGallery: any[] = []
  let arrNamesThumb: string[] = []
  let arrNamesGallery: string[] = []

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
           fileArrThumb.push(pair[1])
        }
      }
     for (const pair of values.entries()) {  
      console.log(pair[0]);
      console.log(pair[1]);      
        if (pair[0] === 'gallery' && pair[1].size) {
           fileArrGallery.push(pair[1])
           
        }
      }

      console.log(fileArrGallery);
      

     // Путь для папки
     const relativeUploadDir = `/images/posts`;
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
     if (fileArrThumb.length > 0) {
       for (const item of fileArrThumb) {
          const fileName = uuidv4() + '.jpg'
          const bytes =  await item.arrayBuffer()
          const bufffer = Buffer.from(bytes)
          await writeFile(`${uploadDir}/${fileName}`, bufffer)
          console.log(`откройте ${uploadDir} чтобы увидеть загруженные файлы`);
          arrNamesThumb.push(fileName)
       }
     }
     if (fileArrGallery.length > 0) {
      for (const item of fileArrGallery) {
        const fileName = uuidv4() + '.jpg'
        const bytes =  await item.arrayBuffer()
        const bufffer = Buffer.from(bytes)
        await writeFile(`${uploadDir}/${fileName}`, bufffer)
        console.log(`откройте ${uploadDir} чтобы увидеть загруженные файлы`);
        arrNamesGallery.push(fileName)
     }
      }

      // console.log(arrNamesGallery);
      
     
     // Загружаем данные в БД
     await prisma.post.create({
        data: {
          title: result.data?.title as string,
          content: result.data?.content as string,
          gip: result.data?.gip as string,
          gap: result.data?.gap as string,
          type: result.data?.type,
          thumbnail: arrNamesThumb,
          gallery: arrNamesGallery,
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

export  const deletePosts  = async (id: number) => {

  // Пути для картинок
  const relativeUploadDir = `/images/posts`;
  const uploadDir = join(process.cwd(), "public/", relativeUploadDir);
  try {
     const data = await getUniquePosts(id)
     const imgArrThumb = data?.thumbnail
     const imgArrGallery = data?.gallery


     // Проходимся по полученному массиву и удаляем картинки с сервера
     imgArrThumb?.forEach(item => {
        fs.unlink(`${uploadDir}/${item}`, err => {
           if (err) {
              console.log(err);
           } else {
              console.log(`Файл ${item} удален`)
           }
        })
     })
     imgArrGallery?.forEach(item => {
        fs.unlink(`${uploadDir}/${item}`, err => {
           if (err) {
              console.log(err);
           } else {
              console.log(`Файл ${item} удален`)
           }
        })
     })

     await prisma.post.delete({
        where: { id }
     });
  } catch (e) {
     throw e
  }
}

export  const updatePosts  = async ( updateId: number, prevState: any, values: FormData)  => {
  // Парсим через схему Zoda в result
  const result = postsSchema.safeParse({
    title: values.get('title'),
    content: values.get('content'),
    gip: values.get('gip'),
    gap: values.get('gap'),
    type: values.get('type')
  })
  
  let fileArrThumb: any[] = []
  let fileArrGallery: any[] = []
  let arrNamesThumb: string[] = []
  let arrNamesGallery: string[] = []

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
  const relativeUploadDir = `/images/posts`;
  const uploadDir = join(process.cwd(), "public/", relativeUploadDir);

  try {
     // Получаем массив картинок
     for (const pair of values.entries()) {        
      if (pair[0] === 'thumbnail' && pair[1].size) {
         fileArrThumb.push(pair[1])
      }
    }
   for (const pair of values.entries()) {        
      if (pair[0] === 'gallery' && pair[1].size) {
         fileArrGallery.push(pair[1])
      }
    }
    //  if (fileArr.length === 0) {
    //     throw new Error('No file to uploaded')
    //  }

     // Удаляем старую картинку, если есть новая
     if (fileArrThumb.length !== 0) {
        const data = await getUniquePosts(updateId)
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
     if (fileArrGallery.length !== 0) {
        const data = await getUniquePosts(updateId)
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

     //  ОБНОВИТЬ IF ВЕЗДЕ
     // загружаем картинку в public
     if(fileArrThumb.length > 0) {
       for (const item of fileArrThumb) {
          const fileName = uuidv4() + '.jpg'
          const bytes =  await item.arrayBuffer()
          const bufffer = Buffer.from(bytes)
          await writeFile(`${uploadDir}/${fileName}`, bufffer)
          console.log(`откройте ${uploadDir} чтобы увидеть загруженные файлы`);
          arrNamesThumb.push(fileName)
       }
     }
     if(fileArrGallery.length > 0) {
       for (const item of fileArrGallery) {
          const fileName = uuidv4() + '.jpg'
          const bytes =  await item.arrayBuffer()
          const bufffer = Buffer.from(bytes)
          await writeFile(`${uploadDir}/${fileName}`, bufffer)
          console.log(`откройте ${uploadDir} чтобы увидеть загруженные файлы`);
          arrNamesGallery.push(fileName)
       }
     }

     // Загружаем данные в БД
     await prisma.post.update({
        where: { id: updateId },
        data: {
          title: result.data?.title as string,
          content: result.data?.content as string,
          gip: result.data?.gip as string,
          gap: result.data?.gap as string,
          type: result.data?.type,
          thumbnail: arrNamesThumb,
          gallery: arrNamesGallery,
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