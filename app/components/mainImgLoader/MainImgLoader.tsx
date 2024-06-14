import React from 'react'
import styles from "./page.module.scss";

import Image from 'next/image'

const MainImgLoader = ({data, styles}: {data: any, styles: any}) => {
  return (
   <div className={styles.clients}>
   <h2 className={styles.clients__partners}>Наши партнеры</h2>
   <ul className={styles.clients__items}>
     {data?.gallery.map(item => 
       <li key={item} className={styles.clients__item}>
         <Image src={`/images/main/${item}`} width={500} height={600} alt={`${item}`}/>
       </li>
     )}
   </ul>
 </div>
  )
}

export default MainImgLoader