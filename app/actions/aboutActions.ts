"use server"
import { aboutSchema } from "@/lib/aboutTypes";
import prisma from "@/lib/db"
import { About } from "@/types/about";
 
export  const getAbout  = async () => {
   try {
     return await prisma.about.findMany({
      orderBy: {
         createdAt: "desc"
      }
     });
   } catch (e) {
      throw e
   } 
}

export async function createAbout(values: About) {
   const result = aboutSchema.safeParse({
      address: values.address,
      phone: values.phone,
      email: values.email,
      yandex: values.yandex
   })


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
      await prisma.about.create({
         data: {
            address: result.data.address,
            phone: result.data.phone,
            email: result.data.email,
            yandex: result.data.yandex
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

export  const deleteAbout  = async (id: number) => {
   try {
      await prisma.about.delete({
         where: { id }
      });
   } catch (e) {
      throw e
   }
}


export  const updateAbout  = async ( updateId: number, values: About)  => {
   // Парсим через схему Zoda в result
   const result = aboutSchema.safeParse({
      address: values.address,
      email: values.email,
      phone: values.phone,
      yandex: values.yandex
   })

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
      // Загружаем данные в БД
      await prisma.about.update({
         where: { id: updateId },
         data: {
            address: result.data?.address as string,
            email: result.data?.email as string,
            phone:  result.data?.phone as string,
            yandex:  result.data?.yandex as string
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