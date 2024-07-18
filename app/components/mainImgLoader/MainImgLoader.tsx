import { getMain } from "@/app/actions/mainActions";
import ImageComponent from "../imageComponent/ImageComponent";
import styles from "./mainImgLoader.module.scss";

const MainImgLoader = async () => {
  const main = await getMain()

  return (
   <div className={styles.clients}>
   <h2 className={styles.clients__partners}>Наши партнеры</h2>
   <ul className={styles.clients__items}>
     {main?.gallery.map(item => 
       <li key={item} className={styles.clients__item}>
         <ImageComponent className={styles.clients__images} src={`/images/${item}`} width={500} height={600} alt={`${item}`}/>
       </li>
     )}
   </ul>
 </div>
  )
}

export default MainImgLoader