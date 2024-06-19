import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createPosts, updatePosts } from '@/app/actions/postActions';
import { message } from 'antd';

import styles from './form.module.scss'

 const PostsFormAdmin = ({ updateId, setRefresh }: { updateId: number, setRefresh: Dispatch<SetStateAction<boolean>> }) => {  
   const initialState = {
      message: {
         status: '',
         text: '',
      }
   }
   const updatedDataFetching = updatePosts.bind(null, updateId)

   const [state, formAction] = useFormState(createPosts, initialState)
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
         <button onClick={refreshHandler} type="submit" disabled={pending} className={styles.form__submit}>
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
                  <label htmlFor="title" className={styles.form__label}>Заполните название:<span style={{color: 'red'}}>*</span></label>
                  <input type="text" required name='title' className={styles.form__input}/>
               </div>
            </div>
            <div className={styles.form__inner}>
               <div className={styles.form__item}>
                  <label htmlFor="content" className={styles.form__label}>Описание:<span style={{color: 'red'}}>*</span></label>
                  <textarea rows={6} name='content' className={styles.form__textarea}/>
               </div>
            </div>
            <div className={styles.form__inner}>
               <div className={styles.form__item}>
                  <label htmlFor="gip" className={styles.form__label}>ГИП:</label>
                  <input type="text" required name='gip' className={styles.form__input}/>
               </div>
            </div>
            <div className={styles.form__inner}>
               <div className={styles.form__item}>
                  <label htmlFor="gap" className={styles.form__label}>ГАП:</label>
                  <input type="text" required name='gap' className={styles.form__input}/>
               </div>
            </div>
            <div className={styles.form__inner}>
               <div className={styles.form__item}>
                  <label htmlFor="type" className={styles.form__label}>Выберите тип:<span style={{color: 'red'}}>*</span></label>
                  <select className={styles.form__select} name="type" id="type">
                     <option value="HOUSE">Жилые</option>
                     <option value="MARKET">Торговые</option>
                     <option value="OFFICE">Офисные</option>
                     <option value="PUBLIC">Общественные</option>
                  </select>
               </div>
            </div>
            <h2 className={styles.form__title}>Провью</h2>
            <div className={styles.form__divider}></div>
            <div className={styles.form__item}>
               <input type="file" id='uploadThumb' name='thumbnail' hidden className={styles.form__upload}/>
               <label htmlFor="uploadThumb" className={styles.form__btn}>Загрузить</label>
            </div>
            <div className={styles.form__divider}></div>
            <h2 className={styles.form__title}>Изображения</h2>
            <div className={styles.form__divider}></div>
            <div className={styles.form__item}>
               <input type="file" multiple id='uploadGal' name='gallery' hidden className={styles.form__upload}/>
               <label htmlFor="uploadGal" className={styles.form__btn}>Загрузить</label>
            </div>
            <div className={styles.form__divider}></div>
         </div>
         <SubmitButton/>
      </form>
   </>
  )
}

export default PostsFormAdmin