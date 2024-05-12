'use client'
import React, { useState, Suspense } from 'react';
import AdminList from '../components/adminList/AdminList';
import { adminSlider } from '@/data/adminSlider';
import { getPosts } from '../actions/getPosts';
import { getUsers } from '../actions/getUsers';
import styles from './page.module.scss'
import { Layout, Menu, theme, Button } from 'antd';
import { UserOutlined, UnorderedListOutlined } from '@ant-design/icons';
import ModalForm from '../components/modalAdmin/ModalAdmin';


const { Content, Footer, Sider, Header } = Layout;

const items = [UserOutlined, UnorderedListOutlined, ].map(
  (icon, index) => ({
    key: String(adminSlider.at(index)),
    icon: React.createElement(icon),
    label: adminSlider.at(index),
  }),
);
const page = () => {
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const [activeSlide, setActiveSlide] = useState('Пользователи')
   const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

  return (
    <div className={styles.admin}>
      <div className={styles.wrapper}>
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
        <Header style={{ paddingLeft: '30px', background: colorBgContainer }}>
          <ModalForm activeSlide ={activeSlide}/>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG}}>
            {activeSlide === adminSlider.at(0) &&
              <AdminList method={getUsers}/>
              }
            {activeSlide === adminSlider.at(1) &&
              <AdminList method={getPosts}/>
            }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>{new Date().getFullYear()} Created by Novikov Vadim</Footer>
      </Layout>
      </Layout>
      </div>
    </div>
  )
}

export default page