import Image from "next/image";
import prisma from "@/lib/db";

import ImgCarouser from "@/app/components/imgCarouser/ImgCarouser";
import PageNavigation from "@/app/components/pageNavigation/PageNavigation";
import styles from "./currentProject.module.scss";

const CurrentProject = async ({ id }: { id: string }) => {
   const posts = await prisma.post.findUnique({
      where: {
         id: Number(id),
      },
   });

   return (
      <div className={styles.project}>
         <div className={styles.wrapper}>
            <h1 className={styles.project__rank}>Проекты</h1>
            <PageNavigation />
                  <h1 className={styles.title}>{posts?.title}</h1>
            <div className={styles.content}>
               <div className={styles.content__img}>
                  <Image
                     src={`/images/posts/${posts?.thumbnail}`}
                     width={1900}
                     height={800}
                     alt={`${posts?.thumbnail[0]}`}
                  />
               </div>
               <div className={styles.content__inner}>
                  <p className={styles.content__description}>{posts?.content}</p>
                  {/* <p className={styles.content__autors}>Авторский состав:</p>
                  <ul className={styles.content__list}>
                     <li className={styles.content__item}>
                        ГИП проекта: {posts?.gip}
                     </li>
                     <li className={styles.content__item}>
                        ГИП проекта: {posts?.gap}
                     </li>
                  </ul> */}
               </div>
            </div>
         </div>
         <div className={styles.galery}>
            <ImgCarouser data={posts} />
         </div>
      </div>
   );
};

export default CurrentProject;
