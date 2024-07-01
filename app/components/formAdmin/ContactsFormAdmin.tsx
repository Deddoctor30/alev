import React, { Dispatch, SetStateAction } from 'react';
import { Form, Input, Button, Divider  } from 'antd';
import type { FormProps } from 'antd';
import { Contacts } from '@/types/contacts';
import { createContacts, updateContacts } from '@/app/actions/contactsActions';
import styles from './form.module.scss';

 const ContactsFormAdmin = ({ updateId, setRefresh }: { updateId: number, setRefresh: Dispatch<SetStateAction<boolean>> }) => {
    const [form] = Form.useForm()
    const onFinish: FormProps<Contacts>['onFinish'] = (values) => {
       console.log('Успешно:', values);
       // Загрузка в БД
       updateId ? updateContacts(updateId, values) : createContacts(values)
       form.resetFields()
       setRefresh(value => !value)
    };
    const onFinishFailed: FormProps<Contacts>['onFinishFailed'] = (errorInfo) => {
       console.log('Ошибка:', errorInfo);
    };

    console.log(updateId);
    
  
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
      <h2 className={styles.form__title}>Связаться с нами</h2>
      {updateId ? 
         <>
            <Form.Item<Contacts> label="По вопросу" name="point">
               <Input size='large'/>
            </Form.Item>
            <Form.Item<Contacts> label="Почта" name="email" rules={[{ type: 'email', message: 'Некорректный E-mail' }]}>
               <Input size='large'/>
            </Form.Item>
         </>
         :
         <>
            <Form.Item<Contacts> label="По вопросу" name="point" rules={[{ required: true, message: 'Заполните название' }]}>
               <Input size='large'/>
            </Form.Item>
            <Form.Item<Contacts> label="Почта" name="email" rules={[{ required: true, type: 'email', message: 'Некорректный E-mail' }]}>
               <Input size='large'/>
            </Form.Item>
         </>
      }
      <Form.Item<Contacts> label="Телефон" name="phone">
         <Input size='large'/>
      </Form.Item>
      <Divider />
      <Form.Item style={{ display: 'flex', justifyContent: 'center'}} >
         <Button size='large' type="primary" htmlType="submit">
            Отправить
         </Button>
      </Form.Item>
   </Form>
    )
}

export default ContactsFormAdmin