import React from 'react';
import { Form, Input, Button, Select, Upload, Divider  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { FormProps, CascaderProps, UploadProps } from 'antd';
const { TextArea } = Input;

type FieldType = {
   title: string;
   content: string;
   thumbnail: File
   gallery: File[]
   gip: string
   gap: string
   type: string
 };

 type Option = {
   value: string;
   label: string;
   children?: Option[];
 }
 
 const FormAdminPosts = () => {

   const normFile = (e: any) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };

   // const props: UploadProps = {
   //    name: 'file',
   //    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
   //    headers: {
   //      authorization: 'authorization-text',
   //    },
   //    onChange(info) {
   //      if (info.file.status !== 'uploading') {
   //        console.log(info.file, info.fileList);
   //      }
   //      if (info.file.status === 'done') {
   //        message.success(`${info.file.name} file uploaded successfully`);
   //      } else if (info.file.status === 'error') {
   //        message.error(`${info.file.name} file upload failed.`);
   //      }
   //    },
   //  };

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
      <Form.Item<FieldType> label="Название" name="title" rules={[{ required: true, message: 'Заполните название' }]}>
         <Input size='large'/>
      </Form.Item>

      <Form.Item<FieldType> label="Содержание" name="content" rules={[{ required: true, message: 'Заполните содержание' }]}>
         <TextArea rows={6} size='large'/>
      </Form.Item>

      <Form.Item<FieldType> label="ГИП" name="gip" rules={[{ required: true, message: 'Заполните ГИПа' }]}>
         <Input size='large'/>
      </Form.Item>

      <Form.Item<FieldType> label="ГАП" name="gap" rules={[{ required: true, message: 'Заполните ГАПа' }]}>
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
               { value: 'house', label: <span>Жилые</span> },
               { value: 'markets', label: <span>Торговые</span> },
               { value: 'office', label: <span>Офисные</span> },
               { value: 'public', label: <span>Общественные</span> },
            ]}
            />
      </Form.Item>

      
      {/* <Form.Item style={{marginBottom: 24, display: 'flex', justifyContent: 'center'}}>
         <Upload  {...props}>
            <Button size='large' icon={<UploadOutlined />}>Загрузить превью картинку</Button>
         </Upload>
      </Form.Item>
      
      <Form.Item style={{marginBottom: 24, display: 'flex', justifyContent: 'center'}}>
         <Upload {...props}>
            <Button size='large' icon={<UploadOutlined />}>Загрузить картинки в галерею</Button>
         </Upload>
      </Form.Item> */}

      <h2 style={{ marginBottom: 24, fontWeight: 500}}>Изображения</h2>
      <Divider />

      <Form.Item
         name="thumbnail"
         label="Превью"
         valuePropName="thumbnail"
         getValueFromEvent={normFile}
         >
         <Upload name="logo" action="/upload.do" listType="picture">
            <Button size='large' icon={<UploadOutlined />}>Загрузить</Button>
         </Upload>
      </Form.Item>

      <Form.Item
         name="gallery"
         label="Галерея"
         valuePropName="gallery"
         getValueFromEvent={normFile}
         >
         <Upload name="logo" action="/upload.do" listType="picture">
            <Button size='large' icon={<UploadOutlined />}>Загрузить</Button>
         </Upload>
      </Form.Item>

      <Form.Item style={{ display: 'flex', justifyContent: 'center'}} >
         <Button size='large' type="primary" htmlType="submit">
            Отправить
         </Button>
      </Form.Item>
   </Form>
  )
}

export default FormAdminPosts