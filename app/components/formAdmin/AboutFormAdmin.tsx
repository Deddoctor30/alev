import { Form, Input, Button, Divider  } from 'antd';
import type { FormProps } from 'antd';
import { About } from '@/types/about';
import { createAbout, updateAbout } from '@/app/actions/aboutActions';
import { Dispatch, SetStateAction } from 'react';

const AboutFormAdmin = ({ updateId, setRefresh }: { updateId: number, setRefresh: Dispatch<SetStateAction<boolean>>  }) => {
  const [form] = Form.useForm()
  const onFinish: FormProps<About>['onFinish'] = (values) => {
      console.log('Успешно:', values);
     // Загрузка в БД
     updateId ? updateAbout(updateId, values) : createAbout(values)
     form.resetFields()
     setRefresh(value => !value) 
  };
  const onFinishFailed: FormProps<About>['onFinishFailed'] = (errorInfo) => {
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
    <Form.Item<About> label="Адрес" name="address">
       <Input size='large'/>
    </Form.Item>
    <Form.Item<About> label="Телефон" name="phone">
      <Input size='large'/>
    </Form.Item>
    <Form.Item<About> label="Почта" name="email" rules={[{ type: 'email', message: 'Заполните E-mail' }]}>
       <Input size='large'/>
    </Form.Item>
    <Form.Item<About> label="Ссылка на Yandex Maps" name="yandex">
       <Input size='large'/>
    </Form.Item>
    <Divider />
    <Form.Item<About> style={{ display: 'flex', justifyContent: 'center'}} >
       <Button size='large' type="primary" htmlType="submit">
          Отправить
       </Button>
    </Form.Item>
 </Form>
  )
}

export default AboutFormAdmin