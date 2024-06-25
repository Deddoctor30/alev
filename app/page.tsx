import Image from 'next/image'
import Link from "next/link";
import { getMain } from "./actions/mainActions";
import { getPosts } from './actions/postActions';
import { Suspense } from 'react';
import Loading from './components/loading/Loading';

import styles from "./page.module.scss";
import MainImgLoader from './components/mainImgLoader/MainImgLoader';

export default async function Home() {
  const main  = await getMain()
  const posts  = await getPosts()
  // const data = posts?.slice(0, 5)


  return (
    <Suspense fallback={<Loading/>}>
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.center}>
            <div className={styles.center__left}>
              <h1>Алев Групп</h1>
              <p>{main?.title}</p>
            </div>
            <div className={styles.center__right}>
              <p>{main?.content}</p>
              {/* <p>С момента основания в 2019 году наша команда реализовала 49 крупных проектов на территории Москвы, Московской области и в других городах России. Наша работа начинается с детальной проработки концепции, разработки АГО, АХО и других разрешаюших документов. После чего начинается стадия проектирования, которая включает в себя разработку проектной и рабочей документации. Кроме того мы предоставляем услуги технадзора и сопровождаем объект вплоть до его ввода в эксплуатацию.</p> */}
              <Link className={styles.center__link} href='/about'>Связаться с нами</Link>
            </div>
        </div>
          <div className={styles.promo}>
              {posts?.map(item => 
                  <div key={item.id} className={styles.promo__item}>
                    <div className={styles.promo__inner}>
                      <p className={styles.promo__subtitle}>{item.title}</p>
                      <p className={styles.promo__content}>{item.content}</p>
                    </div>
                      <Link className={styles.promo__links} href={`/projects/${item.type.toLowerCase()}/${item.id}`}>
                        <Image src={`/images/posts/${item.thumbnail}`} width={1600} height={800} alt={`${item}`} />
                      </Link>
                  </div>
              )}
          </div>
      </div>
        <MainImgLoader data={main?.gallery}/>
        {/* <div className={styles.clients}>
          <h2 className={styles.clients__partners}>Наши партнеры</h2>
          <ul className={styles.clients__items}>
            {main?.gallery.map(item => 
              <li key={item} className={styles.clients__item}>
                <Image src={`/images/main/${item}`} width={500} height={600} alt={`${item}`}/>
              </li>
            )}
          </ul>
        </div> */}
    </main>
    </Suspense>
  );
}
