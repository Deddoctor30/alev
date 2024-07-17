import ImageComponent from "../imageComponent/ImageComponent";
import styles from "./mainImgLoader.module.scss";
import Image from 'next/image'

const MainImgLoader = ({data}: {data: string[]}) => {
  return (
   <div className={styles.clients}>
   <h2 className={styles.clients__partners}>Наши партнеры</h2>
   <ul className={styles.clients__items}>
     {data?.map(item => 
       <li key={item} className={styles.clients__item}>
         <ImageComponent className={styles.clients__images} src={`/images/${item}`} width={500} height={600} alt={`${item}`}/>
         {/* <Image className={styles.clients__images} src={`/images/${item}`} width={500} height={600} alt={`${item}`}/> */}
       </li>
     )}
   </ul>
 </div>
  )
}

export default MainImgLoader