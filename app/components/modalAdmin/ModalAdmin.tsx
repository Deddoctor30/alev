'use client'
import { Button, Modal } from 'antd';
import UserFormAdmin from '../formAdmin/UserFormAdmin';
import PostsFormAdmin from '../formAdmin/PostsFormAdmin';
import MainFormAdmin from '../formAdmin/MainFormAdmin';
import NewsFormAdmin from '../formAdmin/NewsFormAdmin';
import AboutFormAdmin from '../formAdmin/AboutFormAdmin';
import ContactsFormAdmin from '../formAdmin/ContactsFormAdmin';

const ModalAdmin = ({activeSlide, isModalOpen, setIsModalOpen, updateId, setUpdateId}: {activeSlide: string, isModalOpen: any, setIsModalOpen: any, updateId: any, setUpdateId: any}) => {
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
            <UserFormAdmin updateId={updateId}/>
          }
          {activeSlide === 'Посты' && 
            <PostsFormAdmin updateId={updateId}/>
          }
          {activeSlide === 'Главная' && 
            <MainFormAdmin updateId={updateId}/>
          }
          {activeSlide === 'Новости' && 
            <NewsFormAdmin updateId={updateId}/>
          }
          {activeSlide === 'О нас' && 
            <AboutFormAdmin updateId={updateId} />
          }
          {activeSlide === 'Контакты' && 
            <ContactsFormAdmin updateId={updateId}/>
          }
      </Modal>
   </>
  )
}

export default ModalAdmin