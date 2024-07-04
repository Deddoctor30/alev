import React, { Dispatch, SetStateAction } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import type { FormProps } from 'antd';
import styles from './form.module.scss';
import { Admin } from '@/types/admin';
import { createAdmin, updateAdmin } from '@/app/actions/adminActions';

const AdminForm = ({ updateId, setRefresh }: { updateId: number, setRefresh: Dispatch<SetStateAction<boolean>> }) => {
   const [form] = Form.useForm()
   const onFinish: FormProps<Admin>['onFinish'] = (values) => {
      console.log('Успешно:', values);
      // Загрузка в БД
      updateId ? updateAdmin(updateId, values) : createAdmin(values)
      form.resetFields()
      setRefresh(value => !value)
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
         style={{ maxWidth: 1000 }}
         initialValues={{ remember: true }}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
         autoComplete="off">
         <Divider />
         <h2 className={styles.form__title}>Почта и пароль от Панели Администратора</h2>
         {updateId ?
            <>
               <Form.Item<Admin> label="Почта" name="email" rules={[{ type: 'email', message: 'Некорректный E-mail' }]}>
                  <Input size='large' />
               </Form.Item>
               <Form.Item<Admin> label="Пароль" name="password">
                  <Input size='large' />
               </Form.Item>
            </>
            :
            <>
               <Form.Item<Admin> label="Почта" name="email" rules={[{ required: true, type: 'email', message: 'Некорректный E-mail' }]}>
                  <Input size='large' />
               </Form.Item>
               <Form.Item<Admin> label="Пароль" name="password" rules={[{ required: true, message: 'Заполните пароль' }]}>
                  <Input size='large' />
               </Form.Item>
            </>
         }

         <Divider />
         <Form.Item style={{ display: 'flex', justifyContent: 'center' }} >
            <Button size='large' type="primary" htmlType="submit">
               Отправить
            </Button>
         </Form.Item>
      </Form>
   )
}

export default AdminForm