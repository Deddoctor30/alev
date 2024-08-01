"use server"
import { aboutSchema } from "@/lib/aboutTypes";
import prisma from "@/lib/db"
import { About } from "@/types/about";
 
export  const getAbout  = async () => {
   try {
     return await prisma.about.findFirst();
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   }
}
export  const getAboutAll  = async () => {
   try {
     return await prisma.about.findMany({
      orderBy: {
         createdAt: "desc"
      }
     });
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   }
}

export async function createAbout(values: About) {
   const result = aboutSchema.safeParse({
      address: values.address ? values.address : '',
      phone: values.phone ? values.phone : '',
      email: values.email ? values.email : '',
      yandex: values.yandex ? values.yandex : ''
   })

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
      return {message: {
         status: 'error',
         text: e || 'Что-то пошло не так'
      }}
   }
}

export  const deleteAbout  = async (id: number) => {
   try {
      await prisma.about.delete({
         where: { id }
      });
   } catch (e) {
      console.error('Не удалось удалить запись')
   }
}

export  const updateAbout  = async ( updateId: number, values: About)  => {
   // Парсим через схему Zoda в result
   const result = aboutSchema.safeParse({
      address: values.address ? values.address : '',
      phone: values.phone ? values.phone : '',
      email: values.email ? values.email : '',
      yandex: values.yandex ? values.yandex : ''
   })

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
      let finallyData = Object.fromEntries(Object.entries(result.data).filter(([key, value]) => value.length > 0))

      // Загружаем данные в БД
      await prisma.about.update({
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
      return {message: {
         status: 'error',
         text: e || 'Что-то пошло не так'
      }}
   }
}