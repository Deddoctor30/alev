import Link from "next/link";
import { getMain } from "./actions/mainActions";
import { getOnMainPosts, getPosts } from './actions/postActions';
import { Suspense } from 'react';
import Loading from './components/loading/Loading';

import styles from "./page.module.scss";
import MainImgLoader from './components/mainImgLoader/MainImgLoader';
import MainImgThumbs from './components/mainImgThumbs/MainImgThumbs';
import Image from 'next/image'

import one from '@/public/images/background.jpg';
import two from '@/public/images/background2.jpg';

export default async function Home() {
  const main = await getMain()
  const posts = await getOnMainPosts() 

  return (
    <Suspense fallback={<Loading />}>
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.center}>
            <Image className={styles.center__img} src={two} width={1900} height={900} alt="123"/>
            <div className={styles.center__left}>
              <h1 className={styles.center__title}>Проектное бюро
                <br />
                <span className={styles.center__mark}>ALEV group</span></h1>
              <p className={styles.center__subtitle}>{main?.title}</p>
            </div>
            <div className={styles.center__right}>
              <p>{main?.content}</p>
              {/* <p>С момента основания в 2019 году наша команда реализовала 49 крупных проектов на территории Москвы, Московской области и в других городах России. Наша работа начинается с детальной проработки концепции, разработки АГО, АХО и других разрешаюших документов. После чего начинается стадия проектирования, которая включает в себя разработку проектной и рабочей документации. Кроме того мы предоставляем услуги технадзора и сопровождаем объект вплоть до его ввода в эксплуатацию.</p> */}
              <Link className={styles.center__link} href='/about#connection'>Связаться с нами</Link>
            </div>
          </div>
          {posts &&
            <MainImgThumbs data={posts}/>
          }
        </div>
        {main &&
          <MainImgLoader data={main?.gallery} />
        }
      </main>
    </Suspense>
  );
}
