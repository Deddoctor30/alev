import React, { useEffect, useRef } from 'react'
import type { FormProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, Divider, Upload, message } from 'antd';
import { createUser, updateUser } from '@/app/actions/userActions';
import User from '@/types/user';
import { useFormState, useFormStatus } from 'react-dom';

import styles from './form.module.scss'

 const UserFormAdmin = ({ updateId }: { updateId: any }) => {
   // const normFile = (e: any) => {
   //    console.log('Upload event:', e);
   //    if (Array.isArray(e)) {
   //      return e;
   //    }
   //    return e?.fileList;
   //  };

   //  const [form] = Form.useForm()
   // const onFinish: FormProps<User>['onFinish'] = (values) => {
   //    console.log('Success:', values);
   //    // Загрузка в БД
   //    createUser(values)
   //    form.resetFields()
   // };
   // const onFinishFailed: FormProps<User>['onFinishFailed'] = (errorInfo) => {
   //    console.log('Failed:', errorInfo);
   // };



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
         <Form.Item<User> label="Имя" name="name" rules={[{ required: true, message: 'Заполните имя сотрудника' }]}>
            <Input size='large'/>
         </Form.Item>

         <Form.Item<User> label="E-mail" name="email" rules={[{ message: 'Заполните E-mail сотрудника' }]}>
            <Input size='large'/>
         </Form.Item>

         <Form.Item<User> label="Телефон" name="tel" rules={[{ message: 'Заполните телефон сотрудника' }]}>
            <Input size='large'/>
         </Form.Item>

         <Form.Item label="Select" name="position" rules={[{ message: 'Выберите роль сотрудника' }]}>
            <Select
               size='large'
               style={{ width: 120, zIndex: 20, position: 'relative'}}
               // Для отцентровки dropdown меню относительно select'ора
               dropdownStyle={{width: 190, zIndex: 2000, position: 'absolute', top: '35px', left: '0px'}}
               getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
               // --
               options={[
                  { value: 'director', label: <span>Директор</span> },
                  { value: 'preDirector', label: <span>Заместитель директора</span> },
                  { value: 'gip', label: <span>ГИП</span> },
                  { value: 'gap', label: <span>ГАП</span> },
               ]}
               />
         </Form.Item>

         <Form.Item<User>
            name="avatar"
            label="Аватар"
            valuePropName="avatar"
            getValueFromEvent={normFile}
            >
            <Upload name="logo" action="/upload.do" listType="picture">
               <Button size='large' icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
         </Form.Item>

         <Divider />

         <Form.Item style={{ display: 'flex', justifyContent: 'center'}} >
            <Button type="primary" htmlType="submit">
               Отправить
            </Button>
         </Form.Item>
      </Form> */}
   

   {contextHolder}
      <form action={updateId ? formActionUpdate : formAction} ref={formRef} className={styles.form}>
         <div className={styles.form__wrapper}>
            <div className={styles.form__inner}>
               <div className={styles.form__item}>
                  <label htmlFor="name" className={styles.form__label}>Заполните имя сотрудника:*</label>
                  <input type="text" required name='name' className={styles.form__input}/>
               </div>
            </div>
            <div className={styles.form__inner}>
               <div className={styles.form__item}>
                  <label htmlFor="email" className={styles.form__label}>Заполните E-mail сотрудника::</label>
                  <input type="text" required name='email' className={styles.form__input}/>
               </div>
            </div>
            <div className={styles.form__inner}>
               <div className={styles.form__item}>
                  <label htmlFor="tel" className={styles.form__label}>Заполните телефон сотрудника:</label>
                  <input type="text" required name='tel' className={styles.form__input}/>
               </div>
            </div>
            <div className={styles.form__inner}>
               <div className={styles.form__item}>
                  <label htmlFor="position" className={styles.form__label}>Заполните имя сотрудника:<span style={{color: 'red'}}>*</span></label>
                  <select name="position" id="position">
                     <option value="director">Директор</option>
                     <option value="preDirector">Заместитель директора</option>
                     <option value="gip">ГИП</option>
                     <option value="gap">ГАП</option>
                  </select>
               </div>
            </div>

            <h2 style={{ marginBottom: 10, fontWeight: 500}}>Аватар пользователя</h2>
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