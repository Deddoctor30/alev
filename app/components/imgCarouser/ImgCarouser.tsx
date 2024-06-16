'use client'
import { Image as ImageAntd } from 'antd';
const ImgCarouser = ({ data }: {data: any}) => {
  return (
   <ImageAntd.PreviewGroup
      preview={{
      onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
      }}>
      {data.gallery.map(item => 
         <ImageAntd key={item} width={500} src={`/images/posts/${item}`} />
      )}
   </ImageAntd.PreviewGroup>
  )
}

export default ImgCarouser