import React, { useEffect, useRef } from 'react';
import { Form, Input, Button, Select, Upload, Divider, message  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { createPosts, updatePosts } from '@/app/actions/postActions';
import { Post } from '@/types/post';
import { createMain } from '@/app/actions/mainActions';
import { useFormState, useFormStatus } from 'react-dom';
const { TextArea } = Input;

import styles from './form.module.scss'

 const PostsFormAdmin = ({ updateId }: { updateId: any }) => {

   // const normFile = (e: any) => {
   //    console.log('Upload event:', e);
   //    if (Array.isArray(e)) {
   //      return e;
   //    }
   //    return e?.fileList;
   //  };


   // const [form] = Form.useForm()
   // const onFinish: FormProps['onFinish'] = (values) => {
   //    console.log('Success:', values.gallery[0].originFileObj);
   //    const formData = new FormData()
   //    formData.append('title', values.title)
   //    formData.append('content', values.content)
   //    formData.append('gallery', values.gallery[0].originFileObj)
   //    // createMain(formData)
   //    // Загрузка в БД
   //    // createPosts(values)
   //    form.resetFields()

   //    for (const pair of formData.entries()) {        
   //          console.log(pair[0]);
   //          console.log(pair[1]);
            
   //          // fileArr.push(pair[1])
   //       }
   // };
   // const onFinishFailed: FormProps<Post>['onFinishFailed'] = (errorInfo) => {
   //    console.log('Failed:', errorInfo);
   // };


   
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
   const formRef = useRef();

 
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
        <button type="submit" disabled={pending} className={styles.form__submit}>
          Загрузить
        </button>
      )
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
      {/* <Form 
         form={form}
         name="basic"
         labelCol={{ span: 8 }}
         wrapperCol={{ span: 16 }}
         style={{ maxWidth: 1000 }}
         initialValues={{ remember: true }}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
         autoComplete="off">

         <Divider />
         <Form.Item<Post> label="Название" name="title" rules={[{ required: true, message: 'Заполните название' }]}>
            <Input size='large'/>
         </Form.Item>

         <Form.Item<Post> label="Содержание" name="content" rules={[{ required: true, message: 'Заполните содержание' }]}>
            <TextArea rows={6} size='large'/>
         </Form.Item>

         <Form.Item<Post> label="ГИП" name="gip" rules={[{ required: true, message: 'Заполните ГИПа' }]}>
            <Input size='large'/>
         </Form.Item>

         <Form.Item<Post> label="ГАП" name="gap" rules={[{ required: true, message: 'Заполните ГАПа' }]}>
            <Input size='large'/>
         </Form.Item>

         <Form.Item label="Тип" name="type" rules={[{ required: true, message: 'Выберите тип' }]}>
            <Select
               size='large'
               style={{ width: 160, zIndex: 20, position: 'relative', marginBottom: 24 }}
               // Для отцентровки dropdown меню относительно select'ора
               dropdownStyle={{width: 160, zIndex: 2000, position: 'absolute', top: '45px', left: '0px'}}
               getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
               // --
               options={[
                  { value: 'HOUSE', label: <span>Жилые</span> },
                  { value: 'MARKET', label: <span>Торговые</span> },
                  { value: 'OFFICE', label: <span>Офисные</span> },
                  { value: 'PUBLIC', label: <span>Общественные</span> },
               ]}
               />
         </Form.Item>

         <h2 style={{ marginBottom: 24, fontWeight: 500}}>Изображения</h2>
         <Divider />

         <Form.Item
            name="thumbnail"
            label="Превью"
            valuePropName="thumbnail"
            getValueFromEvent={normFile}
            >
            <Upload name="logo" listType="picture">
               <Button size='large' icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
         </Form.Item>

         <Form.Item
            name="gallery"
            label="Галерея"
            valuePropName="gallery"
            getValueFromEvent={normFile}
            >
            <Upload name="logo" listType="picture">
               <Button size='large' icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
         </Form.Item>
         <Divider />

         <Form.Item style={{ display: 'flex', justifyContent: 'center'}} >
            <Button size='large' type="primary" htmlType="submit">
               Отправить
            </Button>
         </Form.Item>
      </Form> */}

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
                  <select name="type" id="type">
                     <option value="HOUSE">Жилые</option>
                     <option value="MARKET">Торговые</option>
                     <option value="OFFICE">Офисные</option>
                     <option value="gap">Общественные</option>
                  </select>
               </div>
            </div>

            <h2 style={{ marginBottom: 10, fontWeight: 500}}>Провью</h2>
            <div className={styles.form__divider}></div>
            <div className={styles.form__item}>
               <input type="file" id='uploadThumb' name='thumbnail' hidden className={styles.form__upload}/>
               <label htmlFor="uploadThumb" className={styles.form__btn}>Загрузить</label>
            </div>
            <div className={styles.form__divider}></div>

            <h2 style={{ marginBottom: 10, fontWeight: 500}}>Изображения</h2>
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