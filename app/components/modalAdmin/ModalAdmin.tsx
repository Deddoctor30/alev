// 'use client'
import { Button, Modal } from 'antd';
import UserFormAdmin from '../formAdmin/UserFormAdmin';
import PostsFormAdmin from '../formAdmin/PostsFormAdmin';
import MainFormAdmin from '../formAdmin/MainFormAdmin';
import NewsFormAdmin from '../formAdmin/NewsFormAdmin';
import AboutFormAdmin from '../formAdmin/AboutFormAdmin';
import ContactsFormAdmin from '../formAdmin/ContactsFormAdmin';
import { Dispatch, SetStateAction } from 'react';
import DocsFormAdmin from '../formAdmin/DocsFormAdmin';
import AdminForm from '../formAdmin/AdminForm';

const ModalAdmin = ({activeSlide, isModalOpen, setIsModalOpen, updateId, setUpdateId, setRefresh}: {activeSlide: string, isModalOpen: any, setIsModalOpen: any, updateId: any, setUpdateId: any, setRefresh: Dispatch<SetStateAction<boolean>>}) => {
   const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
      setUpdateId(null)
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
      setUpdateId(null)
    };

  return (
   <>
      <Button type='primary' size='large' onClick={showModal}>Новая запись</Button>
      <Modal width={activeSlide === 'Посты' ? 800 : 600} title={updateId ? 'Обновить запись' : 'Новая запись'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false} okButtonProps={{style: {display: 'none'}}}>
          {activeSlide === 'Пользователи' && 
            <UserFormAdmin updateId={updateId} setRefresh={setRefresh}/>
          }
          {activeSlide === 'Посты' && 
            <PostsFormAdmin updateId={updateId} setRefresh={setRefresh}/>
          }
          {activeSlide === 'Главная' && 
            <MainFormAdmin updateId={updateId} setRefresh={setRefresh}/>
          }
          {activeSlide === 'Новости' && 
            <NewsFormAdmin updateId={updateId} setRefresh={setRefresh}/>
          }
          {activeSlide === 'О нас' && 
            <AboutFormAdmin updateId={updateId} setRefresh={setRefresh} />
          }
          {activeSlide === 'Контакты' && 
            <ContactsFormAdmin updateId={updateId} setRefresh={setRefresh}/>
          }
          {activeSlide === 'Документы' && 
            <DocsFormAdmin updateId={updateId} setRefresh={setRefresh}/>
          }
          {activeSlide === 'Пароль' && 
            <AdminForm updateId={updateId} setRefresh={setRefresh}/>
          }
      </Modal>
   </>
  )
}

export default ModalAdmin