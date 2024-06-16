'use client'
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import { createUser, updateUser } from '@/app/actions/userActions';
import { message } from 'antd';

import styles from './form.module.scss'

 const UserFormAdmin = ({ updateId, setRefresh }: { updateId: number, setRefresh: Dispatch<SetStateAction<boolean>> }) => {
   const initialState = {
      message: {
         status: '',
         text: '',
      }
   }
   const updatedDataFetching = updateUser.bind(null, updateId)

   const [state, formAction] = useFormState(createUser, initialState)
   const [stateUpdate, formActionUpdate] = useFormState(updatedDataFetching, initialState)
   const [messageApi, contextHolder] = message.useMessage();  
   const formRef = useRef<HTMLFormElement>(null);
 
   useEffect(() => {
      switch (state.message.status) {
         case ('success'):
            success()
         break;
         case ('error'):
            error()
         break;
      }
   }, [state])

   useEffect(() => {
      switch (stateUpdate.message.status) {
         case ('success'):
            success()
         break;
         case ('error'):
            error()
         break;
      }
   }, [stateUpdate])

   
   function SubmitButton() {
      const { pending } = useFormStatus()
      return (
         <button type="submit" onClick={refreshHandler} disabled={pending} className={styles.form__submit}>
          Загрузить
        </button>
      )
   }
   
   const refreshHandler = () => {
      setRefresh(value => !value)     
      document.forms[0].requestSubmit()
   }

   function success() {
      formRef.current?.reset()
      messageApi.open({
         type: 'success',
         content: state.message.text.length !== 0 ? state.message.text : stateUpdate.message.text
      });
   };
         
   function error() {
      messageApi.open({
         type: 'error',
         content: state.message.text.length !== 0 ? state.message.text : stateUpdate.message.text
      });
   };   


  return (
   <>
      {contextHolder}
      <form action={updateId ? formActionUpdate : formAction} ref={formRef} id='form' className={styles.form}>
         <div className={styles.form__wrapper}>
            <div className={styles.form__inner}>
               <div className={styles.form__item}>
                  <label htmlFor="name" className={styles.form__label}>Заполните имя сотрудника:<span style={{color: 'red'}}>*</span></label>
                  <input type="text" required name='name' className={styles.form__input}/>
               </div>
            </div>
            <div className={styles.form__inner}>
               <div className={styles.form__item}>
                  <label htmlFor="email" className={styles.form__label}>Заполните E-mail сотрудника:</label>
                  <input type="text" required name='email' className={styles.form__input}/>
               </div>
            </div>
            <div className={styles.form__inner}>
               <div className={styles.form__item}>
                  <label htmlFor="tel" className={styles.form__label}>Заполните телефон сотрудника:</label>
                  <input type="number" required name='tel' className={styles.form__input}/>
               </div>
            </div>
            <div className={styles.form__inner}>
               <div className={styles.form__item}>
                  <label htmlFor="position" className={styles.form__label}>Заполните имя сотрудника:<span style={{color: 'red'}}>*</span></label>
                  <select className={styles.form__select} name="position" id="position">
                     <option value="director">Директор</option>
                     <option value="preDirector">Заместитель директора</option>
                     <option value="gip">ГИП</option>
                     <option value="gap">ГАП</option>
                  </select>
               </div>
            </div>
            <h2 className={styles.form__title}>Аватар пользователя</h2>
            <div className={styles.form__divider}></div>
            <div className={styles.form__item}>
               <input type="file" id='upload' name='avatar' hidden className={styles.form__upload}/>
               <label htmlFor="upload" className={styles.form__btn}>Загрузить</label>
            </div>
            <div className={styles.form__divider}></div>
         </div>
         <SubmitButton/>
      </form>
   </>
  )
}

export default UserFormAdmin