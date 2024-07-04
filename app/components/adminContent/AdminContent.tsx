import { Layout, Menu, theme } from 'antd';
import AdminList from '../adminList/AdminList';
const { Content } = Layout;

import { deletePosts, getPosts } from '../../actions/postActions';
import { deleteUser, getUsersDesc } from '../../actions/userActions';
import { deleteNews, getNewsAll } from '../../actions/newsActions';
import { deleteMain, getMainAll } from '../../actions/mainActions';
import { deleteAbout, getAbout, getAboutAll } from '../../actions/aboutActions';
import { deleteContacts, getContacts } from '../../actions/contactsActions';
import { Dispatch, SetStateAction } from 'react';
import { deleteDownload, getDownloadAll } from '@/app/actions/downloadActions';
import { deleteAdmin, getAdmin } from '@/app/actions/adminActions';

const AdminContent = ({activeSlide, isModalOpen, setIsModalOpen, setUpdateId, isRefresh, setRefresh}: {activeSlide: string, isModalOpen: boolean, setIsModalOpen: Dispatch<SetStateAction<boolean>>, setUpdateId: Dispatch<SetStateAction<number | null>>, isRefresh: boolean, setRefresh: Dispatch<SetStateAction<boolean>>}) => {
  return (
   <Content style={{ margin: '24px 16px 0' }}>
   <div style={{padding: 24, minHeight: 360, background: 'white', borderRadius: '10px'}}>
     {activeSlide === 'Пользователи' &&
       <AdminList method={getUsersDesc} isRefresh={isRefresh} setRefresh={setRefresh} isModalOpen={isModalOpen} methodDelete={deleteUser} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
     }
     {activeSlide === 'Посты' &&
       <AdminList method={getPosts} isRefresh={isRefresh} setRefresh={setRefresh} isModalOpen={isModalOpen} methodDelete={deletePosts} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
     }
     {activeSlide === 'Главная' &&
     <>
        <h1 style={{ fontSize: '1.25rem' }}>В этой вкладке используется только первая запись, остальные отбрасываются</h1>
       <AdminList method={getMainAll} isRefresh={isRefresh} setRefresh={setRefresh} isModalOpen={isModalOpen} methodDelete={deleteMain} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
     </>
     }
     {activeSlide === 'Новости' &&
       <AdminList method={getNewsAll} isRefresh={isRefresh} setRefresh={setRefresh} isModalOpen={isModalOpen} methodDelete={deleteNews} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
     }
     {activeSlide === 'О нас' &&
     <>
      <h1 style={{ fontSize: '1.25rem' }}>В этой вкладке используется только первая запись, остальные отбрасываются</h1>
      <AdminList method={getAboutAll} isRefresh={isRefresh} setRefresh={setRefresh} isModalOpen={isModalOpen} methodDelete={deleteAbout} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
     </>
     }
     {activeSlide === 'Контакты' &&
       <AdminList method={getContacts} isRefresh={isRefresh} setRefresh={setRefresh} isModalOpen={isModalOpen} methodDelete={deleteContacts} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
     }
     {activeSlide === 'Документы' &&
       <AdminList method={getDownloadAll} isRefresh={isRefresh} setRefresh={setRefresh} isModalOpen={isModalOpen} methodDelete={deleteDownload} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
     }
     {activeSlide === 'Пароль' &&
       <AdminList method={getAdmin} isRefresh={isRefresh} setRefresh={setRefresh} isModalOpen={isModalOpen} methodDelete={deleteAdmin} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
     }
   </div>
 </Content>
  )
}

export default AdminContent