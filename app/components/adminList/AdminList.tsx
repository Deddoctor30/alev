'use Client'
// 'use server'
import React, { Suspense, useEffect, useState } from 'react'
import User from '@/types/user'
import {Post} from '@/types/post'
import { Divider, List, Typography } from 'antd';
import { News } from '@/types/news';
import { Main } from '@/types/main';
import { Deal } from '@/types/deal';
import { Contacts } from '@/types/contacts';
import { About } from '@prisma/client';
import ListControlls from '../listControlls/ListControlls';

type Union = User & Post & News & Main & Deal & Contacts & About

const AdminList   = ({ method, methodDelete, openModal, setUpdateId }: { method: Function, methodDelete: any, openModal: any, setUpdateId: any }) => {
   // const data = await method()
   const [data, setData] = useState<Union[] | Union | null>(null)
   useEffect(() => {
      const fetchData = async () => {
         const fetchedData = await method()
         setData(fetchedData)
      }
      fetchData()
   }, [])

   const createDataArr = (obj: Union): string[] => {
      return Object.values(obj).filter(item => item !== null).map(item => String(item))
   }
   // console.log(data);

  return (
   <ul>
      {Array.isArray(data)
         &&
            data?.map(item => 
               <React.Fragment key={String(item?.createdAt)}>
                  <Divider orientation="left">{
                     item.name ? item.name : item.title
                  }</Divider>
                  <List
                     header={<ListControlls id={item.id} methodDelete={methodDelete} openModal={openModal} setUpdateId={setUpdateId}/>}
                     // footer={<div>Footer</div>}
                     bordered
                     dataSource={createDataArr(item)}
                     renderItem={(item) => (
                        <List.Item>{item}</List.Item>
                  )}/>
               </React.Fragment>
            )
      }
      {
         typeof data === 'object' && !Array.isArray(data) && data !== null 
            &&
            <React.Fragment key={String(data?.createdAt)}>
            <Divider orientation="left">{
               data?.name ? data.name : data?.title
            }</Divider>
            <List
               // header={<div>Header</div>}
               // footer={<div>Footer</div>}
               bordered
               dataSource={createDataArr(data)}
               renderItem={(data) => (
                  <List.Item>{data}</List.Item>
            )}/>
         </React.Fragment>
      }
   </ul>
  )
}

export default AdminList
