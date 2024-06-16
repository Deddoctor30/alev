import Image from 'next/image'
import prisma from '@/lib/db';
import Link from 'next/link'


import styles from './page.module.scss'
import { Suspense } from 'react';
import Loading from '@/app/components/loading/Loading';
import ImgCarouser from '@/app/components/imgCarouser/ImgCarouser';

const page = async ({ params }: { params: { id: string } }) => {
  const posts = await prisma.post.findUnique({
    where: {
      id: Number(params.id)
    }
  })

  return (
    <Suspense fallback={<Loading/>}>
      <div className="wrapper">
         <div className="navigation">
            <ul className="navigation__list">
               <li className="navigation__item">
                  <Link href="/projects">Проекты</Link>
               </li>
               <li>
                  <span>&nbsp;/&nbsp;</span>
               </li>
               <li className="navigation__item">
                  <Link href="/projects/house">Проекты жилых домов</Link>
               </li>
               <li>
                  <span>&nbsp;/&nbsp;</span>
               </li>
               <li>
                  <span className='navigation__item_active'>{posts?.title}</span>
               </li>
            </ul>
         </div>
      </div>
      <div className={styles.project}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{posts?.title}</h1>
          <div className={styles.content}>
            <div className={styles.content__img}>
              {/* <img src={`/images/posts/${posts?.thumbnail}`} alt={posts?.thumbnail}/> */}
              <Image src={`/images/posts/${posts?.thumbnail}`} width={500} height={600} alt={`${posts?.thumbnail[0]}`}/>
            </div>
            <div className={styles.content__inner}>
              <p className={styles.content__description}>{posts?.content}</p>
              <p className={styles.content__autors}>Авторский состав:</p>
              <ul className={styles.content__list}>
                <li className={styles.content__item}>ГИП проекта: {posts?.gip}</li>
                <li className={styles.content__item}>ГИП проекта: {posts?.gap}</li>
              </ul>
            </div>
          </div>
        </div>
        <h2 className={styles.subtitle}>Галерея</h2>
        <div className={styles.galery}>
        <ImgCarouser data={posts}/>
        </div>
      </div>
    </Suspense>
  )
}

export default page