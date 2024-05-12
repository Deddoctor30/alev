'use Client'
import React, { Suspense, useEffect, useState } from 'react'
import User from '@/types/user'
import Post from '@/types/post'
import { Divider, List, Typography } from 'antd';

type Union = User & Post

const AdminList   = ({ method }: { method: Function }) => {
   const [data, setData] = useState<Union[] | null>(null)
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
   console.log(data);

  return (
   <ul>
      {data?.map(item => 
            <React.Fragment key={String(item?.createdAt)}>
               <Divider orientation="left">{
                  item.name ? item.name : item.title
               }</Divider>
               <List
                  // header={<div>Header</div>}
                  // footer={<div>Footer</div>}
                  bordered
                  dataSource={createDataArr(item)}
                  renderItem={(item) => (
                     <List.Item>{item}</List.Item>
               )}/>
            </React.Fragment>
      )}
   </ul>
  )
}

export default AdminList
