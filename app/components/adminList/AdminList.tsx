'use Client'
// 'use server'
import React, { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react'
import User from '@/types/user'
import {Post} from '@/types/post'
import { Divider, List } from 'antd';
import { News } from '@/types/news';
import { Main } from '@/types/main';
// import { Deal } from '@/types/deal';
import { Contacts } from '@/types/contacts';
import { About } from '@prisma/client';
import ListControlls from '../listControlls/ListControlls';
import { adminFormatter } from '@/app/utils/adminFormatter';

type Union = User & Post & News & Main & Post & Contacts & About

const AdminList   = ({ method, isModalOpen, methodDelete, openModal, setUpdateId, isRefresh, setRefresh }: { method: Function, isModalOpen: boolean, methodDelete: (id: number) => Promise<void>, openModal: Dispatch<SetStateAction<boolean>>, setUpdateId: Dispatch<SetStateAction<number | null>>, isRefresh: boolean, setRefresh: Dispatch<SetStateAction<boolean>>}) => {
   const [data, setData] = useState<Union[] | Union | null>(null)
   useEffect(() => {
      const fetchData = async () => {
         const fetchedData = await method()
         setData(fetchedData)
      }
      fetchData()
   }, [isModalOpen, method, isRefresh])

   const createDataArr = (obj: Union): string[] => {
      return Object.values(obj).map(item => String(item))
      // return Object.values(obj).filter(item => item !== null).map(item => String(item))
   }


   data?.forEach(item => {
      console.log((item));
      
   })

  return (
   <ul>
      {Array.isArray(data)
         &&
            data?.map((item, i) => 
               <React.Fragment key={String(item?.createdAt)}>
                  <Divider orientation="left">{
                     item.name ? item.name : item.title
                  }</Divider>
                  <List
                     header={<ListControlls id={item.id} methodDelete={methodDelete} setRefresh={setRefresh} openModal={openModal} setUpdateId={setUpdateId}/>}
                     // footer={<div>Footer</div>}
                     bordered
                     dataSource={createDataArr(item)}
                     renderItem={(element, index) => (
                        // <List.Item>{item}</List.Item>
                        <List.Item>
                        <List.Item.Meta
                          title={adminFormatter(Object.keys(item).at(index))}
                        />
                        {element}
                      </List.Item>
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
