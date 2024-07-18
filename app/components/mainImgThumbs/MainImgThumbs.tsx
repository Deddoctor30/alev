import Link from "next/link";

import styles from "./mainImgThumbs.module.scss";
import ImageComponent from '../imageComponent/ImageComponent';
import { getOnMainPosts } from '@/app/actions/postActions';

const MainImgThumbs = async () => {
  const posts = await getOnMainPosts() 
  return (
   <div className={styles.promo}>
   {posts?.map(item =>
     <div key={item.id} className={styles.promo__item}>
       <Link className={styles.promo__links} href={`/projects/${String(item.type).toLowerCase()}/${item.id}`}>
       <div className={styles.promo__inner}>
         <p className={styles.promo__subtitle}>{item.title.length > 112 ? `${item.title.slice(0, 112)}...` : item.title}</p>
         {item.content &&
          <p className={styles.promo__content}>{item.content.length > 220 ? `${item.content.slice(0, 220)}...` : item.content}</p>
         }
       </div>
       <div className={styles.promo__wrapper}>
         <ImageComponent className={styles.promo__images} src={`/images/${item.thumbnail}`} width={1900} height={800} alt={item.title} />
       </div>
       </Link>
     </div>
   )}
 </div>
  )
}

export default MainImgThumbs