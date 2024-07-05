'use client'
import React, { useEffect, useRef } from 'react';
import styles from '../formAdmin/form.module.scss';
import { authenticate } from '@/app/actions/adminActions';
import { useRouter } from 'next/navigation'
import { message } from 'antd';
import { useFormState, useFormStatus } from 'react-dom';

const LoginForm = () => {
   const token = cookieStore.get('theme')
   const status = useFormStatus()
   const router = useRouter()
   const initialState = {
      message: {
         status: '',
         text: '',
      }
   }
   const [state, formAction] = useFormState(
      authenticate,
      initialState,
   );

   // const [stateUpdate, formActionUpdate] = useFormState(updatedDataFetching, initialState)
   const [messageApi, contextHolder] = message.useMessage();
   const formRef = useRef<HTMLFormElement>(null);

   console.log(state);

   useEffect(() => {
      if (state && state.message.status === 'error') {
         error()
      }
   }, [state])

   function SubmitButton() {
      const status = useFormStatus()

      return (
         <button type="submit" onClick={refreshHandler} disabled={status.pending} className={styles.form__submit}>
            Загрузить
         </button>
      )
   }
   const refreshHandler = () => {
      document.forms[0].requestSubmit()
      if (status.pending === false) {
         router.push('/admin')
      }
   }
   function error() {
      messageApi.open({
         type: 'error',
         content: state && state.message.text
      });
   };

   return (
      <>
         {contextHolder}
         <h2 style={{ textAlign: 'center', width: '100%' }} className={styles.form__title}>Почта и пароль от Панели Администратора</h2>
         <form action={formAction} ref={formRef} id='form' className={styles.form}>
            <div className={styles.form__wrapper}>
               <div className={styles.form__inner}>
                  <div className={styles.form__item}>
                     <label htmlFor="email" className={styles.form__label}>E-mail:</label>
                     <input type="text" name='email' className={styles.form__input} />
                  </div>
               </div>
               <div className={styles.form__inner}>
                  <div className={styles.form__item}>
                     <label htmlFor="password" className={styles.form__label}>Пароль:</label>
                     <input type="number" name='password' className={styles.form__input} />
                  </div>
               </div>
               <div className={styles.form__divider}></div>
            </div>
            <SubmitButton />
         </form>
      </>
   )
}

export default LoginForm