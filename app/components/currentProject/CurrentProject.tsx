import Image from "next/image";
import prisma from "@/lib/db";
import { Table } from "antd";

import ImgCarouser from "@/app/components/imgCarouser/ImgCarouser";
import PageNavigation from "@/app/components/pageNavigation/PageNavigation";
import styles from "./currentProject.module.scss";

const CurrentProject = async ({ id }: { id: string }) => {
   const posts = await prisma.post.findUnique({
      where: {
         id: Number(id),
      },
      include: {
         tep: true
      }
   });
   const tep = posts?.tep.at(0)

   const dataSource = [
      {
         key: tep?.id,
         landArea: tep?.landArea,
         buildArea: tep?.buildArea,
         floorsAbove: tep?.floorsAbove,
         floorsBelow: tep?.floorsBelow,
         liveArea: tep?.liveArea,
         commerceArea: tep?.commerceArea,
         apartmentsCount: tep?.apartmentsCount,
         mopCount: tep?.mopCount,
      }
   ];

   const columns = [
      {
         title: `Площадь участка, кв.м`,
         dataIndex: 'landArea',
         key: 'landArea',
      },
      {
         title: 'Площадь застройки, кв.м',
         dataIndex: 'buildArea',
         key: 'buildArea',
      },
      {
         title: 'Этажность надземная, этажей',
         dataIndex: 'floorsAbove',
         key: 'floorsAbove',
      },
      {
         title: 'Этажность подземная, этажей',
         dataIndex: 'floorsBelow',
         key: 'floorsBelow',
      },
      {
         title: 'Жилая площадь квартир, кв.м',
         dataIndex: 'liveArea',
         key: 'liveArea',
      },
      {
         title: 'Площадь коммерческих помещений, кв.м',
         dataIndex: 'commerceArea',
         key: 'commerceArea',
      },
      {
         title: 'Количество квартир, штук',
         dataIndex: 'apartmentsCount',
         key: 'apartmentsCount',
      },
      {
         title: 'Площадь МОП, кв.м',
         dataIndex: 'mopCount',
         key: 'mopCount',
      },
   ];

   return (
      <div className={styles.project}>
         <div className={styles.wrapper}>
            <h1 className={styles.project__rank}>Проекты</h1>
            <PageNavigation />
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
                  <h1 className={styles.title}>{posts?.title}</h1>
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
            <div className={styles.project__table}>
               {tep &&
                  <Table pagination={false} dataSource={dataSource} columns={columns} />
               }
            </div>
            <div className={styles.galery}>
               {posts?.gallery && posts?.gallery.length > 0 &&
                  <ImgCarouser data={posts} width={760} height={600} count={2} />
               }
            </div>
            <div className={styles.secondContent}>
               {posts?.secondContent &&
                  <p>{posts.secondContent}</p>
               }
            </div>
            <div className={styles.galery}>
               {posts?.gallery && posts?.gallery.length > 0 &&
                  <ImgCarouser data={posts} width={500} height={300} starts={2} />
               }
            </div>
         </div>
      </div>
   );
};

export default CurrentProject;
