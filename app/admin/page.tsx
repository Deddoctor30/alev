/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState, Suspense } from 'react';
import { adminSlider } from '@/data/adminSlider';
import ModalAdmin from '../components/modalAdmin/ModalAdmin';
import { Layout, Menu, theme } from 'antd';
import { UserOutlined, UnorderedListOutlined, HomeOutlined, ReadOutlined, InfoCircleOutlined, UsergroupAddOutlined, CopyOutlined, KeyOutlined } from '@ant-design/icons';
import styles from './page.module.scss'
import Loading from '../components/loading/Loading';
import AdminContent from '../components/adminContent/AdminContent';



const { Content, Footer, Sider, Header } = Layout;

const items = [UserOutlined, UnorderedListOutlined, HomeOutlined, ReadOutlined, InfoCircleOutlined, UsergroupAddOutlined, CopyOutlined, KeyOutlined].map(
  (icon, index) => ({
    key: String(adminSlider.at(index)),
    icon: React.createElement(icon),
    label: adminSlider.at(index),
  }),
);
const page = () => {
  const [refresh, setRefresh] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [activeSlide, setActiveSlide] = useState('Пользователи')
   const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [updateId, setUpdateId] = useState<number | null>(null)
    

  return (
    <Suspense fallback={<Loading/>}>
      <div className={styles.admin}>
        <div className={styles.wrapper}>
        
        {/* Левый бар */}
        <Layout>
          <Sider style={{ borderRadius: 10 }} breakpoint="xxl" collapsedWidth="0" 
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
            <ModalAdmin activeSlide ={activeSlide} setRefresh={setRefresh} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} updateId={updateId} setUpdateId={setUpdateId}/>
          </Header>

          {/* Часть контента */}
          <AdminContent activeSlide={activeSlide} isRefresh={refresh} setRefresh={setRefresh} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setUpdateId={setUpdateId}/>
          <Footer style={{ textAlign: 'center' }}>{new Date().getFullYear()}Created by Novikov Vadim</Footer>
        </Layout>
        </Layout>
        </div>
      </div>

    </Suspense>
  )
}

export default page