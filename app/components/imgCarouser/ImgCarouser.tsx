'use client'
import { Post } from '@/types/post';
import { Image as ImageAntd } from 'antd';
const ImgCarouser = ({ data }: {data: Post}) => {
  return (
   <ImageAntd.PreviewGroup
      preview={{
      onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
      }}>
      {data.gallery.map(item => 
         <ImageAntd key={item} width={500} height={300} src={`/images/posts/${item}`} />
      )}
   </ImageAntd.PreviewGroup>
  )
}

export default ImgCarouser