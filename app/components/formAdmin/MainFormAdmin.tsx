'use client'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createMain, updateMain } from '@/app/actions/mainActions';
import { message } from 'antd';

import Image from 'next/image';
import styles from './form.module.scss';

const MainFormAdmin = ({ updateId, setRefresh }: { updateId: number, setRefresh: Dispatch<SetStateAction<boolean>> }) => {
   let previewUrl: string[] = []
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
   const [urlImg, setUrlImg] = useState<string[] | null>(null)

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
      previewUrl.forEach(item => {
         URL.revokeObjectURL(item)
      })
      setUrlImg(null)
   }


   const imgChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      for (let i = 0; i < e.target.files?.length; i++) {
         previewUrl.push(URL.createObjectURL(e.target.files[i]))
         setUrlImg(previewUrl)
      }
   }

   return (
      <>
         {contextHolder}
         <form action={updateId ? formActionUpdate : formAction} ref={formRef} className={styles.form}>
            <div className={styles.form__wrapper}>
               <div className={styles.form__inner}>
                  <div className={styles.form__item}>
                     <label htmlFor="title" className={styles.form__label}>Название:</label>
                     <input type="text" name='title' className={styles.form__input} />
                  </div>
               </div>
               <div className={styles.form__inner}>
                  <div className={styles.form__item}>
                     <label htmlFor="content" className={styles.form__label}>Описание:</label>
                     <textarea rows={6} name='content' className={styles.form__textarea} />
                  </div>
               </div>
               <h2 className={styles.form__title}>Изображения партнеров</h2>
               <div className={styles.form__divider}></div>
               <div className={styles.form__item}>
                  <input multiple={true} onChange={(e) => imgChangeHandler(e)} type="file" id='upload' name='gallery' hidden className={styles.form__upload} />
                  <div className={styles.form__temp}>
                     <label htmlFor="upload" className={styles.form__btn}>Загрузить</label>
                     <div className={styles.form__images}>
                        {urlImg && urlImg.length > 0 &&
                           urlImg?.map(item =>
                              <Image key={String(item)} className={styles.form__img} width={200} height={150} src={item} alt="123" />
                           )
                        }
                     </div>
                  </div>
               </div>
               <div className={styles.form__divider}></div>
            </div>
            <SubmitButton />
         </form>
      </>
   )
}

export default MainFormAdmin