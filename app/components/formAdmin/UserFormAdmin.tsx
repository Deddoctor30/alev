'use client'
import React, { ChangeEventHandler, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import { createUser, updateUser } from '@/app/actions/userActions';
import { message } from 'antd';

import styles from './form.module.scss'
import Image from 'next/image';

 const UserFormAdmin = ({ updateId, setRefresh }: { updateId: number, setRefresh: Dispatch<SetStateAction<boolean>> }) => {
   let previewUrl = ''
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
   const [urlImg, setUrlImg] = useState('')
 
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
      URL.revokeObjectURL(previewUrl)
      setUrlImg('')
   }
   

   function success() {
      formRef.current?.reset()
      messageApi.open({
         type: 'success',
         content: `${state.message.text.length !== 0 ? state.message.text : stateUpdate.message.text}`
      });
   };
         
   function error() {
      messageApi.open({
         type: 'error',
         content: `${state.message.text.length !== 0 ? state.message.text : stateUpdate.message.text}`
      });
   };
   
   const imgChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return
      previewUrl = URL.createObjectURL(e.target.files[0])
      setUrlImg(previewUrl)
   }
   
  return (
   <>
      {contextHolder}
      <form action={updateId ? formActionUpdate : formAction} ref={formRef} id='form' className={styles.form}>
         <div className={styles.form__wrapper}>
            <div className={styles.form__inner}>
               <div className={styles.form__item}>
                  {updateId ?
                  <>
                     <label htmlFor="name" className={styles.form__label}>Имя сотрудника:</label>
                     <input type="text" name='name' className={styles.form__input}/>
                  </>
                     :
                  <>
                     <label htmlFor="name" className={styles.form__label}>Имя сотрудника:<span style={{color: 'red'}}>*</span></label>
                     <input type="text" required name='name' className={styles.form__input}/>
                  </>
                  }

               </div>
            </div>
            <div className={styles.form__inner}>
               <div className={styles.form__item}>
                  <label htmlFor="email" className={styles.form__label}>E-mail сотрудника:</label>
                  <input type="text" name='email' className={styles.form__input}/>
               </div>
            </div>
            <div className={styles.form__inner}>
               <div className={styles.form__item}>
                  <label htmlFor="tel" className={styles.form__label}>Телефон сотрудника:</label>
                  <input type="number" name='tel' className={styles.form__input}/>
               </div>
            </div>
            <div className={styles.form__inner}>
               <div className={styles.form__item}>
                  <label htmlFor="position" className={styles.form__label}>Должность:</label>
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
               <input type="file" id='upload' name='avatar' onChange={(e) => imgChangeHandler(e)} hidden className={styles.form__upload}/>
               <div className={styles.form__temp}>
                  <label htmlFor="upload" className={styles.form__btn}>Загрузить</label>
                  {urlImg.length > 0 &&
                     <Image className={styles.form__img} width={200} height={150} src={urlImg} alt="123" />
                  }
               </div>
            </div>
            <div className={styles.form__divider}></div>
         </div>
         <SubmitButton/>
      </form>
   </>
  )
}

export default UserFormAdmin