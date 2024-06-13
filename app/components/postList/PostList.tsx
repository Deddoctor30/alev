'use Client'
import React, { useEffect, useState } from 'react'
import { getPosts } from '@/app/actions/postsActions';
import Post from '@/types/post';

import { Divider, List, Typography } from 'antd';

const PostsList = () => {
   const [posts, setPosts] = useState<Post[] | null>(null)
   useEffect(() => {
      const fetchPosts = async () => {
         const fetchedPosts = await getPosts()
         setPosts(fetchedPosts)
      }
      fetchPosts()
   }, [])

   
   const createDataArr = (obj: Post): any[] => {
      return Object.values(obj).map(item => String(item)).map(item => item === 'null' ? item = 'Нет данных' : item)
   }
   
  return (
    <ul>
      {posts && 
         posts?.map(item => 
            <React.Fragment key={item.id}>
               <Divider orientation="left">{item.title}</Divider>
               <List
                  // header={<div>Header</div>}
                  // footer={<div>Footer</div>}
                  bordered
                  // dataSource={[item.id, item.content, String(item.createdAt), String(item.updatedAt)]}
                  dataSource={createDataArr(item)}
                  renderItem={(item) => (
                     <List.Item>{item}</List.Item>
               )}/>
            </React.Fragment>
         )}
    </ul>
  )
}

export default PostsList
