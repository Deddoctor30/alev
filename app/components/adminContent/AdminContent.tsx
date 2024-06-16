import { Layout, Menu, theme } from 'antd';
import AdminList from '../adminList/AdminList';
const { Content } = Layout;

import { deletePosts, getPosts } from '../../actions/postActions';
import { deleteUser, getUsers } from '../../actions/userActions';
import { deleteNews, getNewsAll } from '../../actions/newsActions';
import { deleteMain, getMainAll } from '../../actions/mainActions';
import { deleteAbout, getAbout } from '../../actions/aboutActions';
import { deleteContacts, getContacts } from '../../actions/contactsActions';
import { Dispatch, SetStateAction } from 'react';

const AdminContent = ({activeSlide, isModalOpen, setIsModalOpen, setUpdateId, isRefresh, setRefresh}: {activeSlide: string, isModalOpen: boolean, setIsModalOpen: Dispatch<SetStateAction<boolean>>, setUpdateId: Dispatch<SetStateAction<number | null>>, isRefresh: boolean, setRefresh: Dispatch<SetStateAction<boolean>>}) => {
  return (
   <Content style={{ margin: '24px 16px 0' }}>
   <div style={{padding: 24, minHeight: 360, background: 'white', borderRadius: '10px'}}>
     {activeSlide === 'Пользователи' &&
       <AdminList method={getUsers} isRefresh={isRefresh} setRefresh={setRefresh} isModalOpen={isModalOpen} methodDelete={deleteUser} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
     }
     {activeSlide === 'Посты' &&
       <AdminList method={getPosts} isRefresh={isRefresh} setRefresh={setRefresh} isModalOpen={isModalOpen} methodDelete={deletePosts} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
     }
     {activeSlide === 'Главная' &&
       <AdminList method={getMainAll} isRefresh={isRefresh} setRefresh={setRefresh} isModalOpen={isModalOpen} methodDelete={deleteMain} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
     }
     {activeSlide === 'Новости' &&
       <AdminList method={getNewsAll} isRefresh={isRefresh} setRefresh={setRefresh} isModalOpen={isModalOpen} methodDelete={deleteNews} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
     }
     {activeSlide === 'О нас' &&
       <AdminList method={getAbout} isRefresh={isRefresh} setRefresh={setRefresh} isModalOpen={isModalOpen} methodDelete={deleteAbout} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
     }
     {activeSlide === 'Контакты' &&
       <AdminList method={getContacts} isRefresh={isRefresh} setRefresh={setRefresh} isModalOpen={isModalOpen} methodDelete={deleteContacts} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
     }
   </div>
 </Content>
  )
}

export default AdminContent