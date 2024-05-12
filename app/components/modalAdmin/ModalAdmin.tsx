'use client'
import { Button, Modal, Select } from 'antd';
import { useState } from 'react';
import FormAdminUser from '../formAdmin/FormAdminUser';
import FormAdminPosts from '../formAdmin/FormAdminPosts';

const ModalAdmin = ({activeSlide}: {activeSlide: string}) => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

  return (
   <>
      <Button type='primary' size='large' onClick={showModal}>Новая запись</Button>
      <Modal width={activeSlide === 'Посты' ? 800 : 600} title="Новая запись" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false} okButtonProps={{style: {display: 'none'}}}>
          {activeSlide === 'Пользователи' && 
            <FormAdminUser/>
          }
          {activeSlide === 'Посты' && 
            <FormAdminPosts/>
          }
      </Modal>
   </>
  )
}

export default ModalAdmin