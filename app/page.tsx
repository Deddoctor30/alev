export const dynamic = 'force-dynamic'

import Link from "next/link";
import { Suspense } from 'react';
import Loading from './components/loading/Loading';
import styles from "./page.module.scss";
import MainImgLoader from './components/mainImgLoader/MainImgLoader';
import MainImgThumbs from './components/mainImgThumbs/MainImgThumbs';
import Image from 'next/image'
import two from '@/public/images/background2.jpg';

export default async function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Image className={styles.image} src={two} width={1900} height={900} alt="Main background"/>
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.center}>
              <div className={styles.center__wrapper}>
                <p className={styles.center__title}>Проектное бюро</p>
                <p className={styles.center__mark}>Alev Group</p>
              </div>
          </div>
          <MainImgThumbs/>
        </div>
        <Link className={styles.center__link} href='/about#connection'>Связаться с нами →</Link>
        <MainImgLoader />
      </main>
    </Suspense>
  );
}
