import prisma from "@/lib/db";
import styles from './page.module.scss'
import { dateFormatter } from "@/app/utils/dateFormatter";
import Image from "next/image";

const page = async ({ params }: { params: { id: string } }) => {
   const news = await prisma.news.findUnique({
      where: {
         id: Number(params.id),
      }
   })
   
   return (
      <>
      {news &&
         <div className={styles.news}>
            <div className={styles.wrapper}>
               <a href="/news" className={styles.news__rank}>Новости</a>
                  <p className={styles.news__createdAt}>{dateFormatter(news.createdAt)}</p>
                  <div className={styles.news__inner}>
                     <h2 className={styles.news__title}>{news.title}</h2>
                     <p className={styles.news__content}>{news.content}</p>
                  </div>
                  <div className={styles.news__gallery}>
                     {news.gallery.map(item =>
                        <Image key={item} src={`/images/news/${item}`} width={600} height={500} alt={item}/>
                     )}
                  </div>
            </div>
         </div>
      }
      </>
   )
}

export default page