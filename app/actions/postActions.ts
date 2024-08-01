"use server"
import prisma from "@/lib/db"
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { v4 as uuidv4 } from 'uuid';
import { postsSchema } from "@/lib/postsTypes";
import { postsUpdateSchema } from "@/lib/postUpdateTypes";
import fs from 'fs';

type Type = "HOUSE" | "MARKET" | "OFFICE" | "PUBLIC";

export const getPosts = async () => {
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
      console.error('Ошибка чтения БД', e);
   }
}

export const getOnProjectsPosts = async (take: number) => {
   try {
      return await prisma.post.findMany({
         take: take,
         orderBy: {
            createdAt: "desc"
         }
      });
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   }
}

export const getOnMainPosts = async () => {
   try {
      return await prisma.post.findMany({
         where: {
            isOnMain: true
         },
         orderBy: {
            createdAt: "desc"
         }
      });
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   }
}

export const getPostsCurrent = async (type: Type, take: number) => {
   try {
      return await prisma.post.findMany({
         take: take,
         where: {
            type: type,
          },
         orderBy: {
            createdAt: "desc"
         },
         include: {
            tep: true
         }
      });
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   }
}

// Для update
export const getUniquePosts = async (id: number | string) => {
   try {
      return await prisma.post.findUnique({
         where: { 
            id: Number(id)
         }
      });
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   }
}
export const getUniquePostsInclTep = async (id: string) => {
   try {
      return await prisma.post.findUnique({
         where: { 
            id: Number(id)
          },
         include: {
            tep: true
         }
      });
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   }
}
export const getUniqueNamePosts = async (title: string) => {
   try {
      return await prisma.post.findFirst({
         where: {
           title: title
         },
         select: { id: true }
      });
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   }
}

export async function createPosts(prevState: any, values: FormData) {
   // Валидация формы
   const result = postsSchema.safeParse({
      title: values.get('title'),
      content: values.get('content'),

      secondContent: values.get('secondContent'),
      landArea: values.get('landArea'),
      buildArea: values.get('buildArea'),
      floorsAbove: values.get('floorsAbove'),
      floorsBelow: values.get('floorsBelow'),
      liveArea: values.get('liveArea'),
      commerceArea: values.get('commerceArea'),
      apartmentsCount: values.get('apartmentsCount'),
      mopCount: values.get('mopCount'),

      type: values.get('type'),
      isOnMain: values.get('isOnMain')
   })
   const galleryItem = values.get('gallery') as File
   const thumbNailItem = values.get('thumbnail') as File
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
      return {
         message: {
            status: 'error',
            text: errorMessage.length !== 0 ? errorMessage : 'Ошибка валидации'
         }
      }
   }

   try {
      // Получаем картинки в массив
      if (thumbNailItem.size) {
         fileArrThumb.push(thumbNailItem)
      }
      if (galleryItem.size) {
         fileArrGallery.push(galleryItem)
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
      if (fileArrThumb.length > 0) {
         for (const item of fileArrThumb) {
            const fileName = uuidv4() + '.jpg'
            const bytes = await item.arrayBuffer()
            const bufffer = Buffer.from(bytes)
            await writeFile(`${uploadDir}/${fileName}`, bufffer)
            console.log(`откройте ${uploadDir} чтобы увидеть загруженные файлы`);
            arrNamesThumb.push(fileName)
         }
      }

      if (fileArrGallery.length > 0) {
         for (const item of fileArrGallery) {
            const fileName = uuidv4() + '.jpg'
            const bytes = await item.arrayBuffer()
            const bufffer = Buffer.from(bytes)
            await writeFile(`${uploadDir}/${fileName}`, bufffer)
            console.log(`откройте ${uploadDir} чтобы увидеть загруженные файлы`);
            arrNamesGallery.push(fileName)
         }
      }

      console.log(result.data);


      // Загружаем данные в БД
      await prisma.post.create({
         data: {
            title: result.data?.title,
            content: result.data?.content,
            secondContent: result.data?.secondContent,
            type: result.data?.type as Type,
            thumbnail: arrNamesThumb,
            gallery: arrNamesGallery,
            isOnMain: result.data.isOnMain
         }
      })

      const findTitle = await getUniqueNamePosts(result.data.title)
      console.log('postId', findTitle);
      
      await prisma.tep.create({
         data: {
            postId: findTitle?.id,
            landArea: result.data?.landArea,
            buildArea: result.data?.buildArea,
            floorsAbove: result.data?.floorsAbove,
            floorsBelow: result.data?.floorsBelow,
            liveArea: result.data?.liveArea,
            commerceArea: result.data?.commerceArea,
            apartmentsCount: result.data?.apartmentsCount,
            mopCount: result.data?.mopCount,
         }
      })

      return {
         message: {
            status: 'success',
            text: 'Данные успешно загружены'
         }
      }
   } catch (e) {
      return {message: {
         status: 'error',
         text: `${e}` || 'Что-то пошло не так'
      }}
   }
}

export const deletePosts = async (id: number) => {
   // Пути для картинок
   const relativeUploadDir = `/images`;
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
      await prisma.tep.delete({
         where: { postId: id }
      })
      await prisma.post.delete({
         where: { id }
      })
   } catch (e) {
      console.error('Не удалось удалить запись', e)
   }
}

export const updatePosts = async (updateId: number, prevState: any, values: FormData) => {
   // Парсим через схему Zoda в result
   const result = postsUpdateSchema.safeParse({
      title: values.get('title'),
      content: values.get('content'),
      type: values.get('type'),
      isOnMain: values.get('isOnMain'),
      secondContent: values.get('secondContent')
   })

   let rawTep = {
      landArea: values.get('landArea'),
      buildArea: values.get('buildArea'),
      floorsAbove: values.get('floorsAbove'),
      floorsBelow: values.get('floorsBelow'),
      liveArea: values.get('liveArea'),
      commerceArea: values.get('commerceArea'),
      apartmentsCount: values.get('apartmentsCount'),
      mopCount: values.get('mopCount'),
   }
   const galleryItem = values.get('gallery') as File
   const thumbNailItem = values.get('thumbnail') as File
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
      return {
         message: {
            status: 'error',
            text: errorMessage.length !== 0 ? errorMessage : 'Ошибка валидации'
         }
      }
   }

   // Путь для папки
   const relativeUploadDir = `/images`;
   const uploadDir = join(process.cwd(), "public/", relativeUploadDir);

   try {
      // Получаем массив картинок
      if (thumbNailItem.size) {
         fileArrThumb.push(thumbNailItem)
      }
      if (galleryItem.size) {
         fileArrGallery.push(galleryItem)
      }
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

      // загружаем картинку в public
      if (fileArrThumb.length > 0) {
         for (const item of fileArrThumb) {
            const fileName = uuidv4() + '.jpg'
            const bytes = await item.arrayBuffer()
            const bufffer = Buffer.from(bytes)
            await writeFile(`${uploadDir}/${fileName}`, bufffer)
            console.log(`откройте ${uploadDir} чтобы увидеть загруженные файлы`);
            arrNamesThumb.push(fileName)
         }
      }
      if (fileArrGallery.length > 0) {
         for (const item of fileArrGallery) {
            const fileName = uuidv4() + '.jpg'
            const bytes = await item.arrayBuffer()
            const bufffer = Buffer.from(bytes)
            await writeFile(`${uploadDir}/${fileName}`, bufffer)
            console.log(`откройте ${uploadDir} чтобы увидеть загруженные файлы`);
            arrNamesGallery.push(fileName)
         }
      }

      // Оставляем только не пустые данные в объекте
      let finallyData : {[k: string]: string | string[] | boolean;} = Object.fromEntries(Object.entries(result.data).filter(([key, value]) => !!value))
      if (arrNamesThumb.length > 0) {
         finallyData.thumbnail = arrNamesThumb[0]
      }
      if (arrNamesGallery.length > 0) {
         finallyData.gallery = arrNamesGallery
      }
      // Загружаем данные в БД
      await prisma.post.update({
         where: { id: updateId },
         data: {
            ...finallyData,
         }
      })

      let finallyTepData = Object.fromEntries(Object.entries(rawTep).filter(([key, value]) => !!value))
      // Загружаем данные в БД
      await prisma.tep.upsert({
         where: { postId: updateId },
         update: {
            ...finallyTepData,
         },
         create: {
            landArea: values.get('landArea') as string,
            buildArea: values.get('buildArea') as string,
            floorsAbove: values.get('floorsAbove') as string,
            floorsBelow: values.get('floorsBelow') as string,
            liveArea: values.get('liveArea') as string,
            commerceArea: values.get('commerceArea') as string,
            apartmentsCount: values.get('apartmentsCount') as string,
            mopCount: values.get('mopCount') as string,
            postId: updateId
         }
      })

      return {
         message: {
            status: 'success',
            text: 'Данные успешно обновлены'
         }
      }
   } catch (e) {
      return {message: {
         status: 'error',
         text: e || 'Что-то пошло не так'
      }}
   }
}