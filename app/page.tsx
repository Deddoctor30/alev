import Link from "next/link";
import { getMain } from "./actions/mainActions";
import { getOnMainPosts, getPosts } from './actions/postActions';
import { Suspense } from 'react';
import Loading from './components/loading/Loading';

import styles from "./page.module.scss";
import MainImgLoader from './components/mainImgLoader/MainImgLoader';
import MainImgThumbs from './components/mainImgThumbs/MainImgThumbs';
import Image from 'next/image'

import two from '@/public/images/background2.jpg';

export default async function Home() {
  const main = await getMain()
  const posts = await getOnMainPosts() 

  return (
    <Suspense fallback={<Loading />}>
      <Image className={styles.image} src={two} width={1900} height={900} alt="123"/>
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.center}>
              <div className={styles.center__wrapper}>
                <p className={styles.center__title}>Проектное бюро</p>
                <p className={styles.center__mark}>Alev Group</p>
              </div>
          </div>
          {posts &&
            <MainImgThumbs data={posts}/>
          }
        </div>
        <Link className={styles.center__link} href='/about#connection'>Связаться с нами →</Link>
        {main &&
          <MainImgLoader data={main?.gallery} />
        }
      </main>
    </Suspense>
  );
}
