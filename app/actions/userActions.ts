"use server"
import prisma from "@/lib/db"
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from "next/cache";
import { userSchema } from "@/lib/userTypes";
const fs = require('fs');
 
export  const getUsers  = async () => {
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
     throw e
  } 
}

// Для update
export  const getUniqueUser  = async (id: number) => {
  try {
    return await prisma.user.findUnique({
     where: { id }
    });
  } catch (e) {
     throw e
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
        text: errorMessage.length !== 0 ? errorMessage : 'Что-то пошло не так'
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
     const relativeUploadDir = `/images/user`;
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
     console.log(arrNames);
     
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

export  const deleteUser  = async (id: number) => {

  // Пути для картинок
  const relativeUploadDir = `/images/user`;
  const uploadDir = join(process.cwd(), "public/", relativeUploadDir);
  try {
     const data = await getUniqueUser(id)
     const imgArr = data?.avatar

     console.log(imgArr);
     

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
    //  revalidatePath('/admin')
  } catch (e) {
     throw e
  }
}

export  const updateUser  = async ( updateId: number, prevState: any, values: FormData)  => {
  // Парсим через схему Zoda в result
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
        text: errorMessage.length !== 0 ? errorMessage : 'Что-то пошло не так'
     }}
  }

  // Путь для папки
  const relativeUploadDir = `/images/user`;
  const uploadDir = join(process.cwd(), "public/", relativeUploadDir);

  try {
     // Получаем массив картинок
     for (const pair of values.entries()) {
        if (pair[0] === 'avatar') {
           fileArr.push(pair[1])
        }
      }
   //   if (fileArr.length === 0) {
   //      throw new Error('No file to uploaded')
   //   }

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
     for (const item of fileArr) {
        const fileName = uuidv4() + '.jpg'
        const bytes =  await item.arrayBuffer()
        const bufffer = Buffer.from(bytes)
        await writeFile(`${uploadDir}/${fileName}`, bufffer)
        console.log(`откройте ${uploadDir} чтобы увидеть загруженные файлы`);
        arrNames.push(fileName)
     }

     // Загружаем данные в БД
     await prisma.user.update({
        where: { id: updateId },
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