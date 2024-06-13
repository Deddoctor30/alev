'use Client'
import React, { useEffect, useState } from 'react'
import { getUsers } from '@/app/actions/usersActions'
import User from '@/types/user'

import { Divider, List, Typography } from 'antd';

const UsersList = () => {
   const [users, setUsers] = useState<User[] | null>(null)
   useEffect(() => {
      const fetchUsers = async () => {
         const fetchedUsers = await getUsers()
         setUsers(fetchedUsers)
      }
      fetchUsers()
   }, [])


   const createDataArr = (obj: User): any[] => {
      return Object.values(obj).map(item => String(item)).map(item => item === 'null' ? item = 'Нет данных' : item)
   }

   console.log(users);
   

  return (
    <ul>
      {users && 
         users?.map(item => 
            <React.Fragment key={String(item?.createdAt)}>
               <Divider orientation="left">{item.name}</Divider>
               <List
                  // header={<div>Header</div>}
                  // footer={<div>Footer</div>}
                  bordered
                  // dataSource={[item.id, item.name, item.email, item.role]}
                  dataSource={createDataArr(item)}
                  renderItem={(item) => (
                     <List.Item>{item}</List.Item>
               )}/>
            </React.Fragment>
      )}
    </ul>
  )
}

export default UsersList
