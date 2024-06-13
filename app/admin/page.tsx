/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState, Suspense } from 'react';
import AdminList from '../components/adminList/AdminList';
import { adminSlider } from '@/data/adminSlider';
import { deletePosts, getPosts } from '../actions/postActions';
import { deleteUser, getUsers } from '../actions/userActions';
import styles from './page.module.scss'
import { Layout, Menu, theme } from 'antd';
import { UserOutlined, UnorderedListOutlined, HomeOutlined, ReadOutlined, InfoCircleOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import ModalAdmin from '../components/modalAdmin/ModalAdmin';
import { deleteNews, getNews, getNewsAll } from '../actions/newsActions';
import { deleteMain, getMain, getMainAll } from '../actions/mainActions';
import { deleteAbout, getAbout } from '../actions/aboutActions';
import { deleteContacts, getContacts } from '../actions/contactsActions';


const { Content, Footer, Sider, Header } = Layout;

const items = [UserOutlined, UnorderedListOutlined, HomeOutlined, ReadOutlined, InfoCircleOutlined, UsergroupAddOutlined ].map(
  (icon, index) => ({
    key: String(adminSlider.at(index)),
    icon: React.createElement(icon),
    label: adminSlider.at(index),
  }),
);
const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [activeSlide, setActiveSlide] = useState('Пользователи')
   const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [updateId, setUpdateId] = useState<number | null>(null)

  return (
    <div className={styles.admin}>
      <div className={styles.wrapper}>
      
      {/* Левый бар */}
      <Layout>
         <Sider breakpoint="xxl" collapsedWidth="0" 
         //    onBreakpoint={(broken) => {
         //     console.log(broken);
         //   }}
         //   onCollapse={(collapsed, type) => {
         //     console.log(collapsed, type);
         //   }}
         >
         <div className={styles.logo}>Панель Администратора</div>
         <Menu theme="dark" mode="inline" defaultSelectedKeys={['Пользователи']} items={items} onClick={(info) => setActiveSlide(info?.key)}/>
         </Sider>
      <Layout>

        {/* Модалка */}
        <Header style={{ paddingLeft: '30px', background: colorBgContainer }}>
          <ModalAdmin activeSlide ={activeSlide} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} updateId={updateId} setUpdateId={setUpdateId}/>
        </Header>

        {/* Часть контента */}
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG}}>
            {activeSlide === 'Пользователи' &&
              <AdminList method={getUsers} methodDelete={deleteUser} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
            }
            {activeSlide === 'Посты' &&
              <AdminList method={getPosts} methodDelete={deletePosts} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
            }
            {activeSlide === 'Главная' &&
              <AdminList method={getMainAll} methodDelete={deleteMain} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
            }
            {activeSlide === 'Новости' &&
              <AdminList method={getNewsAll} methodDelete={deleteNews} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
            }
            {activeSlide === 'О нас' &&
              <AdminList method={getAbout} methodDelete={deleteAbout} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
            }
            {activeSlide === 'Контакты' &&
              <AdminList method={getContacts} methodDelete={deleteContacts} openModal={setIsModalOpen} setUpdateId={setUpdateId}/>
            }
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>{new Date().getFullYear()} Created by Novikov Vadim</Footer> */}
      </Layout>
      </Layout>
      </div>
    </div>
  )
}

export default page