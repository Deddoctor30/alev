import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createPosts, updatePosts } from '@/app/actions/postActions';
import { message } from 'antd';

import styles from './form.module.scss'
import Image from 'next/image';

const PostsFormAdmin = ({ updateId, setRefresh }: { updateId: number, setRefresh: Dispatch<SetStateAction<boolean>> }) => {
   let previewUrlThumb = ''
   let previewUrl: string[] = []
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
   const [urlImgThumb, setUrlImgThumb] = useState('')
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
      URL.revokeObjectURL(previewUrlThumb)
      previewUrl.forEach(item => {
         URL.revokeObjectURL(item)
      })
      setUrlImgThumb('')
      setUrlImg(null)
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

   const imgChangeHandlerThumb = (e: React.ChangeEvent<HTMLInputElement>) => {
      previewUrlThumb = URL.createObjectURL(e.target.files[0])
      setUrlImgThumb(previewUrlThumb)
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
                     <label htmlFor="title" className={styles.form__label}>Заполните название:<span style={{ color: 'red' }}>*</span></label>
                     <input type="text" required name='title' className={styles.form__input} />
                  </div>
               </div>
               <div className={styles.form__inner}>
                  <div className={styles.form__item}>
                     <label htmlFor="content" className={styles.form__label}>Описание:</label>
                     <textarea rows={6} name='content' className={styles.form__textarea} />
                  </div>
               </div>
               <div className={styles.form__inner}>
                  <div className={styles.form__item}>
                     <label htmlFor="gip" className={styles.form__label}>ГИП:</label>
                     <input type="text" name='gip' className={styles.form__input} />
                  </div>
               </div>
               <div className={styles.form__inner}>
                  <div className={styles.form__item}>
                     <label htmlFor="gap" className={styles.form__label}>ГАП:</label>
                     <input type="text" name='gap' className={styles.form__input} />
                  </div>
               </div>
               <div className={styles.form__inner}>
                  <div className={styles.form__item}>
                     <label htmlFor="type" className={styles.form__label}>Выберите тип:<span style={{ color: 'red' }}>*</span></label>
                     <select className={styles.form__select} name="type" id="type">
                        <option value="HOUSE">Жилые</option>
                        <option value="MARKET">Торговые</option>
                        <option value="OFFICE">Офисные</option>
                        <option value="PUBLIC">Общественные</option>
                     </select>
                  </div>
               </div>
               <div className={styles.form__inner}>
                  <div className={styles.form__item}>
                     <input type="checkbox" id='isOnMain' name='isOnMain' className={styles.form__checkbox} />
                     <label htmlFor="isOnMain" className={styles.form__checkboxLabel}>Показывать превью на главной странице</label>
                  </div>
               </div>
               <h2 className={styles.form__title}>Превью</h2>
               <div className={styles.form__divider}></div>
               <div className={styles.form__item}>
                  <input type="file" id='uploadThumb' onChange={(e) => imgChangeHandlerThumb(e)} name='thumbnail' hidden className={styles.form__upload} />
                  <div className={styles.form__temp}>
                     <label htmlFor="uploadThumb" className={styles.form__btn}>Загрузить</label>
                     {urlImgThumb.length > 0 &&
                        <Image className={styles.form__img} width={200} height={200} src={urlImgThumb} alt="123" />
                     }
                  </div>
               </div>
               <div className={styles.form__divider}></div>
               <h2 className={styles.form__title}>Изображения</h2>
               <div className={styles.form__divider}></div>
               <div className={styles.form__item}>
                  <input type="file" onChange={(e) => imgChangeHandler(e)} multiple id='uploadGal' name='gallery' hidden className={styles.form__upload} />
                  <div className={styles.form__temp}>
                     <label htmlFor="uploadGal" className={styles.form__btn}>Загрузить</label>
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

export default PostsFormAdmin