import Image from 'next/image'
import Link from "next/link";
import { Post } from '@/types/post';

import styles from "./mainImgThumbs.module.scss";

const MainImgThumbs = ({data}: {data: Post[]}) => {
  return (
   <div className={styles.promo}>
   {data?.map(item =>
     <div key={item.id} className={styles.promo__item}>
       <div className={styles.promo__inner}>
         <p className={styles.promo__subtitle}>{item.title}</p>
         <p className={styles.promo__content}>{item.content.length > 220 ? `${item.content.slice(0, 220)}...` : item.content}</p>
       </div>
       <Link className={styles.promo__links} href={`/projects/${item.type.toLowerCase()}/${item.id}`}>
         <Image src={`/images/posts/${item.thumbnail}`} width={1600} height={800} alt={`${item}`} />
       </Link>
     </div>
   )}
 </div>
  )
}

export default MainImgThumbs