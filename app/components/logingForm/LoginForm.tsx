'use client'
import React, { Dispatch, SetStateAction } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import type { FormProps } from 'antd';
import styles from '../formAdmin/form.module.scss';
import { Admin } from '@/types/admin';
import { authenticate } from '@/app/actions/adminActions';
import { useRouter } from 'next/navigation'

const LoginForm = () => {
   const router = useRouter()
   const [form] = Form.useForm()
   const onFinish: FormProps<Admin>['onFinish'] = (values) => {
      console.log('Успешно:', values);
      // Загрузка в БД
      authenticate(undefined, values)
      form.resetFields()
      router.push('/admin')
   };
   const onFinishFailed: FormProps<Admin>['onFinishFailed'] = (errorInfo) => {
      console.log('Ошибка:', errorInfo);
   };


   return (
      <Form
         form={form}
         name="basic"
         labelCol={{ span: 8 }}
         wrapperCol={{ span: 16 }}
         style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
         initialValues={{ remember: true }}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
         autoComplete="off">
         <h2 style={{ textAlign: 'center', width: '100%' }} className={styles.form__title}>Почта и пароль от Панели Администратора</h2>
         <Form.Item<Admin> label="Почта" name="email" rules={[{ required: true, type: 'email', message: 'Некорректный E-mail' }]}>
            <Input style={{ width: '300px' }} size='large' />
         </Form.Item>
         <Form.Item<Admin> label="Пароль" name="password" rules={[{ required: true, message: 'Заполните пароль' }]}>
            <Input style={{ width: '300px' }} size='large' />
         </Form.Item>
         <Divider />
         <Form.Item style={{ display: 'flex', justifyContent: 'center' }} >
            <Button size='large' type="primary" htmlType="submit">
               Отправить
            </Button>
         </Form.Item>
      </Form>
   )
}

export default LoginForm