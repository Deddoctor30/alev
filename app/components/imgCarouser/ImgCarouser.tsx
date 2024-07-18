'use client'
import { useWindowDimensions } from '@/app/utils/useWindowsDimensions';
import { Post } from '@/types/post';
import { Image as ImageAntd } from 'antd';
import { useEffect, useState } from 'react';
const ImgCarouser = ({ data, width, height, count, starts }: { data: Post, width?: number, height?: number, count?: number, starts?: number }) => {
   // Т.к. на сервере идет статика через /... проверяю на режим разработки чтобы работало и в dev режиме и в prod
   const env = process.env.NODE_ENV
   let source = null
   if (count) {
      source = data.gallery.slice(0, count)
   } else if (starts) {
      source = data.gallery.slice(starts)
   } else {
      source = data.gallery
   }
  

   return (
      <>
         {env === 'development' ?
            <ImageAntd.PreviewGroup
               preview={{
                  onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
               }}>
               {source.map(item =>
                  <ImageAntd key={String(item)} width={'auto'} height='auto' src={`/images/${item}`} />
               )}
            </ImageAntd.PreviewGroup>
            :
            <ImageAntd.PreviewGroup
               preview={{
                  onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
               }}>
               {source.map(item =>
                  <ImageAntd key={String(item)} width={'auto'} height='auto' src={`/${item}`} />
               )}
            </ImageAntd.PreviewGroup>
         }
      </>



   )
}

         export default ImgCarouser