import React from 'react';
import { Form, Input, Button, Select, Upload, Divider  } from 'antd';
import type { FormProps } from 'antd';
import { Contacts } from '@/types/contacts';
import { createContacts, updateContacts } from '@/app/actions/contactsActions';

 const ContactsFormAdmin = ({ updateId }: { updateId: any }) => {
    const [form] = Form.useForm()
    const onFinish: FormProps<Contacts>['onFinish'] = (values) => {
       console.log('Success:', values);
       // Загрузка в БД
       updateId ? updateContacts(updateId, values) : createContacts(values)
       form.resetFields()
    };
    const onFinishFailed: FormProps<Contacts>['onFinishFailed'] = (errorInfo) => {
       console.log('Failed:', errorInfo);
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
      <h2 style={{ marginBottom: 24, fontWeight: 500}}>Связаться с нами</h2>
      <Form.Item<Contacts> label="По вопросу" name="point" rules={[{ required: true, message: 'Заполните название' }]}>
         <Input size='large'/>
      </Form.Item>
      <Form.Item<Contacts> label="Почта" name="email" rules={[{ required: true, type: 'email', message: 'Заполните содержание' }]}>
         <Input size='large'/>
      </Form.Item>
      <Form.Item<Contacts> label="Телефон" name="phone" rules={[{ message: 'Заполните содержание' }]}>
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