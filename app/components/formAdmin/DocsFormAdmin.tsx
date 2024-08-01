import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
// import { createNews, updateNews } from '@/app/actions/newsActions';
import { message, Tooltip } from 'antd';

import Image from 'next/image';
import styles from './form.module.scss'
import { createDownload, updateDownload } from '@/app/actions/downloadActions';

const DocsFormAdmin = ({ updateId, setRefresh }: { updateId: number, setRefresh: Dispatch<SetStateAction<boolean>> }) => {
   let previewUrl = ''
   const initialState = {
      message: {
         status: '',
         text: '',
      }
   }
   const updatedDataFetching = updateDownload.bind(null, updateId)

   const [state, formAction] = useFormState(createDownload, initialState)
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

   console.log(state.message.text);
   console.log(typeof state.message.text);
   

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
      if (e.target.files) {
         previewUrl = URL.createObjectURL(e.target.files[0])
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
                     {updateId ?
                     <>
                        <label htmlFor="title" className={styles.form__label}>Заголовок:</label>
                        <input type="text" name='title' className={styles.form__input} />
                     </>
                     :
                     <>
                        <label htmlFor="title" className={styles.form__label}>Заголовок:<span style={{ color: 'red' }}>*</span></label>
                        <input type="text" required name='title' className={styles.form__input} />
                     </>
                  }
                  </div>
               </div>
               <div className={styles.form__inner}>
                  <div className={styles.form__item}>
                     <label htmlFor="content" className={styles.form__label}>Описание:</label>
                     <textarea rows={6} name='content' className={styles.form__textarea} />
                  </div>
               </div>
               <h2 className={styles.form__title}>Файл</h2>
               <Tooltip getPopupContainer={(triggerNode: HTMLElement) => triggerNode.parentNode as HTMLElement} overlayInnerStyle={{ fontSize: '0.8rem' }} overlayStyle={{ position: 'absolute', top: '414px', left: '34px', paddingBottom: '100px', marginBottom: '-100px' }} zIndex={5000} placement='bottom' title="Текст на английском языке, без пробелов, в нижнем регистре">
                  <span className={styles.form__subtext}>Пример названия файла: «brandbook.pdf»</span>
               </Tooltip>
               <div className={styles.form__divider}></div>
               <div className={styles.form__item}>
                  <input type="file" id='upload' name='file' hidden className={styles.form__upload} />
                  <label htmlFor="upload" className={styles.form__btn}>Загрузить</label>
               </div>
               <div className={styles.form__divider}></div>
               <h2 className={styles.form__title}>Превью</h2>
               <div className={styles.form__item}>
                  <input type="file" id='thumbnail' onChange={(e) => imgChangeHandler(e)} name='thumbnail' hidden className={styles.form__upload} />
                  <div className={styles.form__temp}>
                     <label htmlFor="thumbnail" className={styles.form__btn}>Загрузить</label>
                     {urlImg.length > 0 &&
                        <Image className={styles.form__img} width={200} height={150} src={urlImg} alt="123" />
                     }
                  </div>
               </div>
               <div className={styles.form__divider}></div>
            </div>
            <SubmitButton />
         </form>
      </>
   )
}

export default DocsFormAdmin