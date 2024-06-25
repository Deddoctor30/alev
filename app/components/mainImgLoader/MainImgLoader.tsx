import styles from "./mainImgLoader.module.scss";

import Image from 'next/image'

const MainImgLoader = ({data}: {data: string[]}) => {
  return (
   <div className={styles.clients}>
   <h2 className={styles.clients__partners}>Наши партнеры</h2>
   <ul className={styles.clients__items}>
     {data?.map(item => 
       <li key={item} className={styles.clients__item}>
         <Image src={`/images/main/${item}`} width={500} height={600} alt={`${item}`}/>
       </li>
     )}
   </ul>
 </div>
  )
}

export default MainImgLoader