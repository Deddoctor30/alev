"use server"
import prisma from "@/lib/db"
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { v4 as uuidv4 } from 'uuid';
import { userSchema } from "@/lib/userTypes";
import { userUpdateSchema } from "@/lib/userUpdateTypes";
import fs from 'fs';
 
export  const getUsers  = async () => {
  try {
    return await prisma.user.findMany({
        include: {
           posts: true
        },
       });
  } catch (e) {
     console.error('Ошибка чтения БД', e);
  } 
}
 
export  const getUsersDesc  = async () => {
  try {
    return await prisma.user.findMany({
        include: {
           posts: true
        },
        orderBy: {
          createdAt: "desc"
       }
       });
  } catch (e) {
     console.error('Ошибка чтения БД', e);
  } 
}

// Для update
export  const getUniqueUser  = async (id: number) => {
  try {
    return await prisma.user.findUnique({
     where: { id }
    });
  } catch (e) {
   console.error('Ошибка чтения БД', e);
  } 
}

export async function createUser(prevState: any, values: FormData) {
  // Валидация формы
  const result = userSchema.safeParse({
    name: values.get('name'),
    email: values.get('email'),
    tel: values.get('tel'),
    position: values.get('position')
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
        if (pair[0] === 'avatar' && pair[1].size) {
           fileArr.push(pair[1])
        }
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
     await prisma.user.create({
        data: {
          name: result.data?.name as string,
          email: result.data?.email as string,
          tel: result.data?.tel as string,
          position: result.data?.position as string,
          avatar: arrNames
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

export  const deleteUser  = async (id: number) => {
  // Пути для картинок
  const relativeUploadDir = `/images`;
  const uploadDir = join(process.cwd(), "public/", relativeUploadDir);
  try {
     const data = await getUniqueUser(id)
     const imgArr = data?.avatar

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

     await prisma.user.delete({
        where: { id }
     });
  } catch (e) {
     console.error('Не удалось удалить запись')
  }
}

export  const updateUser  = async ( updateId: number, prevState: any, values: FormData)  => {
  // Парсим через схему Zoda в result
  const result = userUpdateSchema.safeParse({
    name: values.get('name'),
    email: values.get('email'),
    tel: values.get('tel'),
    position: values.get('position')
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
     // Получаем массив картинок
     for (const pair of values.entries()) {
        if (pair[0] === 'avatar' && pair[1].size) {
           fileArr.push(pair[1])
        }
      }
      
      // Путь для папки
      const relativeUploadDir = `/images`;
      const uploadDir = join(process.cwd(), "public/", relativeUploadDir);

     // Удаляем старую картинку, если есть новая
     if (fileArr.length !== 0) {
        const data = await getUniqueUser(updateId)
        const imgArr = data?.avatar
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
      finallyData.avatar = arrNames
     }

     // Загружаем данные в БД
     await prisma.user.update({
        where: { id: updateId },
        data: {
         ...finallyData,
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