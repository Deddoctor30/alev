'use client'
import Link from "next/link";
import { getMain } from "./actions/mainActions";
import { getOnMainPosts } from './actions/postActions';
import { Suspense, useEffect, useState } from 'react';
import Loading from './components/loading/Loading';

import styles from "./page.module.scss";
import MainImgLoader from './components/mainImgLoader/MainImgLoader';
import MainImgThumbs from './components/mainImgThumbs/MainImgThumbs';
import Image from 'next/image'

import two from '@/public/images/background2.jpg';
import { Post } from "@/types/post";
import { Main } from "@/types/main";

export default function Home() {
  const [mainData, setMainData] = useState<Main | null>(null)
  const [postsData, setPostsData] = useState<Post[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
       const main = await getMain()
       const posts = await getOnMainPosts() 
       setMainData(main)
       setPostsData(posts)
    }
    fetchData()
 }, []) 

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
          {postsData &&
            <MainImgThumbs data={postsData}/>
          }
        </div>
        <Link className={styles.center__link} href='/about#connection'>Связаться с нами →</Link>
        {mainData &&
          <MainImgLoader data={mainData?.gallery} />
        }
      </main>
    </Suspense>
  );
}
