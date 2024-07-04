"use server"
import { adminSchema } from "@/lib/adminTypes";
import { adminUpdateSchema } from "@/lib/adminUpdateTypes";
import prisma from "@/lib/db"
import { Admin } from "@/types/admin";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
   prevState: string | undefined,
   formData: Admin,
 ) {
   try {
     await signIn('credentials', formData);
   } catch (error) {
     if (error instanceof AuthError) {
       switch (error.type) {
         case 'CredentialsSignin':
           return 'Неверные данные для входа';
         default:
           return 'Что-то пошло не так';
       }
     }
     throw error;
   }
 }
 
export  const getAdmin  = async () => {
   try {
     return await prisma.admin.findMany({
      orderBy: {
         createdAt: "desc"
      }
     });
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   } 
}
 
export  const getAdminByEmail  = async (email: string) => {
   try {
     return await prisma.admin.findUnique({
      where: {
         email: email
      }
     });
   } catch (e) {
      console.error('Ошибка чтения БД', e);
   } 
}

export async function createAdmin(values: Admin) {
   // Валидация формы  

   console.log(values);
   
   const result = adminSchema.safeParse({
      email: values.email,
      password: values.password
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

      await prisma.admin.create({
         data: {
            email: result.data.email,
            password: result.data.password,
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

export  const deleteAdmin  = async (id: number) => {
   try {
      await prisma.admin.delete({
         where: { id }
      });
   } catch (e) {
      console.error('Не удалось удалить запись')
   }
}

export  const updateAdmin  = async ( updateId: number, values: Admin)  => {
   console.log(values);
   
   // Парсим через схему Zoda в result
   const result = adminUpdateSchema.safeParse({
      email: values.email,
      password: values.email,
   })

   console.log(result);
   

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
      await prisma.admin.update({
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