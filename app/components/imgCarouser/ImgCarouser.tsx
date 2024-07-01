'use client'
import { Post } from '@/types/post';
import { Image as ImageAntd } from 'antd';
const ImgCarouser = ({ data, width, height, count, starts }: { data: Post, width: number, height: number, count?: number, starts?: number }) => {
   let source = null
   if (count) {
      source = data.gallery.slice(0, count)
   } else if (starts) {
      source = data.gallery.slice(starts)
   } else {
      source = data.gallery
   }
   return (
      <ImageAntd.PreviewGroup
         preview={{
            onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
         }}>
         {source.map(item =>
               <ImageAntd key={String(item)} width={width} height={height} src={`/images/posts/${item}`} />
         )}
      </ImageAntd.PreviewGroup>
   )
}

export default ImgCarouser