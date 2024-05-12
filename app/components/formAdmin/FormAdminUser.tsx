import React from 'react'
import type { FormProps } from 'antd';
import { Form, Input, Button, Select, Divider } from 'antd';

type FieldType = {
   username: string;
   email: string;
 };
 
 const FormAdminUser = () => {
    const [form] = Form.useForm()
   const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
      console.log('Success:', values);
      // Загрузка в БД
      // createUser(values)
      form.resetFields()
   };
   const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
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
      <Form.Item<FieldType> label="Имя" name="username" rules={[{ required: true, message: 'Заполните имя сотрудника' }]}>
         <Input size='large'/>
      </Form.Item>

      <Form.Item<FieldType> label="E-mail" name="email" rules={[{ required: true, message: 'Заполните E-mail сотрудника' }]}>
         <Input size='large'/>
      </Form.Item>

      <Form.Item label="Select" name="select" rules={[{ required: true, message: 'Выберите роль сотрудника' }]}>
         <Select
            size='large'
            style={{ width: 120, zIndex: 20, position: 'relative', marginBottom: 24 }}
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

      <Form.Item style={{ display: 'flex', justifyContent: 'center'}} >
         <Button type="primary" htmlType="submit">
            Отправить
         </Button>
      </Form.Item>
   </Form>
  )
}

export default FormAdminUser