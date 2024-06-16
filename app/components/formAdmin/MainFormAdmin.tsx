'use client'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createMain, updateMain } from '@/app/actions/mainActions';
import { message  } from 'antd';

import styles from './form.module.scss';

const MainFormAdmin = ({ updateId, setRefresh }: { updateId: number, setRefresh: Dispatch<SetStateAction<boolean>> }) => {
   const initialState = {
      message: {
         status: '',
         text: '',
      }
   }
   const updatedDataFetching = updateMain.bind(null, updateId)

   const [state, formAction] = useFormState(createMain, initialState)
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
      <form action={updateId ? formActionUpdate : formAction} ref={formRef} className={styles.form}>
         <div className={styles.form__wrapper}>
            <div className={styles.form__inner}>
               <div className={styles.form__item}>
                  <label htmlFor="title" className={styles.form__label}>Название:</label>
                  <input type="text" name='title' className={styles.form__input}/>
               </div>
            </div>
            <div className={styles.form__inner}>
               <div className={styles.form__item}>
                  <label htmlFor="content" className={styles.form__label}>Описание:<span style={{color: 'red'}}>*</span></label>
                  <textarea rows={6} name='content' className={styles.form__textarea}/>
               </div>
            </div>
            <h2 className={styles.form__title}>Изображения</h2>
            <div className={styles.form__divider}></div>
            <div className={styles.form__item}>
               <input multiple={true} type="file" id='upload' name='gallery' hidden className={styles.form__upload}/>
               <label htmlFor="upload" className={styles.form__btn}>Загрузить</label>
            </div>
            <div className={styles.form__divider}></div>
         </div>
         <SubmitButton/>
      </form>
   </>
  )
}

export default MainFormAdmin