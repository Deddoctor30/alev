"use server"
import { contactsSchema } from "@/lib/contactsTypes";
import prisma from "@/lib/db"
import { Contacts } from "@/types/contacts";
 
export  const getContacts  = async () => {
   try {
     return await prisma.contacts.findMany({
      orderBy: {
         createdAt: "desc"
      }
     });
   } catch (e) {
      throw e
   } 
}

export async function createContacts(values: Contacts) {
   // Валидация формы
   console.log(values);
   
   const result = contactsSchema.safeParse({
      point: values.point,
      email: values.email,
      phone: values.phone
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
      await prisma.contacts.create({
         data: {
            point: result.data.point,
            email: result.data.email,
            phone: result.data.phone
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

export  const deleteContacts  = async (id: number) => {
   try {
      await prisma.contacts.delete({
         where: { id }
      });
   } catch (e) {
      throw e
   }
}


export  const updateContacts  = async ( updateId: number, values: Contacts)  => {
   // Парсим через схему Zoda в result
   const result = contactsSchema.safeParse({
      point: values.point,
      email: values.email,
      phone: values.phone
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
      await prisma.contacts.update({
         where: { id: updateId },
         data: {
            point: result.data?.point as string,
            email: result.data?.email as string,
            phone:  result.data?.phone as string
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