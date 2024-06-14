import Image from 'next/image'
import Link from 'next/link';
import one from '@/public/images/21.jpg';
import two from '@/public/images/22.jpg';
import three from '@/public/images/23.jpg';
import four from '@/public/images/24.jpg';
import styles from './page.module.scss'
import { Suspense } from 'react';
import Loading from '../components/loading/Loading';

const page = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <div className={styles.projects}>
        <div className={styles.wrapper}>
          <div className={styles.items}>
            <div className={styles.items__item}>
              <div className={styles.items__inner}>
                <Link href={'./projects/houses'}>
                  <p>Жилые</p>
                  <Image src={one} alt="first" />
                </Link>
              </div>
            </div>
            <div className={styles.items__item}>
              <div className={styles.items__inner}>
              <Link href={'./projects/office'}>
                <p>Офисные</p>
                <Image src={two} alt="first" />
              </Link>
              </div>
            </div>
            <div className={styles.items__item}>
              <div className={styles.items__inner}>
              <Link href={'./projects/markets'}>
                <p>Торговые</p>
                <Image src={three} alt="first" />
              </Link>
              </div>
            </div>
            <div className={styles.items__item}>
              <div className={styles.items__inner}>
              <Link href={'./projects/public'}>
                <p>Общественные</p>
                <Image src={four} alt="first" />
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default page