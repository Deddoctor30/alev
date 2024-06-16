import Image from 'next/image'
import Link from 'next/link';
import prisma from '@/lib/db';

import styles from './postsList.module.scss'

type Type = 'HOUSE' | 'MARKET' | 'OFFICE' | 'PUBLIC'

const page = async ({ type }: { type: Type })  => {
  const houses = await prisma.post.findMany({
    where: {
      type: type
    }
  })

  const titleFnc = () => {
   switch (type) {
      case 'HOUSE': 
       return 'Проекты жилых домов'
   }
   switch (type) {
      case 'MARKET': 
       return 'Проекты торговых зданий'
   }
   switch (type) {
      case 'OFFICE': 
       return 'Проекты офисных зданий'
   }
   switch (type) {
      case 'PUBLIC': 
       return 'Проекты общественных зданий'
   }
  }


  return (
    <>
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
                <span className='navigation__item_active'>{titleFnc()}</span>
               </li>
            </ul>
         </div>
      </div>
      <div className={styles.houses}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>
              {titleFnc()}
          </h1>
          <ul className={styles.list}>
            {houses?.map (item => 
              <li key={item.id} className={styles.item}>
                <Link href={`/projects/${type.toLowerCase()}/${item.id}`}>
                  <div className={styles.item__img}>
                    <Image src={`/images/posts/${item.thumbnail}`} alt={item.thumbnail[0]} width={500} height={500} />
                  </div>
                  <p className={styles.item__description}>{item.content}</p>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default page