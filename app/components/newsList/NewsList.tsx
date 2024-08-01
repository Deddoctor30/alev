'use client'
import { useInView } from 'react-intersection-observer'
import styles from "./newsList.module.scss";
import { useEffect, useState } from 'react';
import { News } from '@/types/news';
import { getOnNewsPage } from '@/app/actions/newsActions';
import { dateFormatter } from '@/app/utils/dateFormatter';
import { titleCutter } from '@/app/utils/titleCutter';

const increace = 10;

const NewsList = () => {
   const { ref, inView } = useInView()
   const [take, setTake] = useState(increace)
   const [news, setNews] = useState<News[] | null | undefined>(null)

   useEffect(() => {
      const fetchData = async () => {
         const fetchedData = await getOnNewsPage(take)
         setNews(fetchedData)
      }
      fetchData()
   }, [])

   useEffect(() => {
      if (inView) {
         const fetchData = async () => {
            const fetchedData = await getOnNewsPage(take)
            setNews(fetchedData)
         }
         fetchData()
         setTake(item => item + increace)
      }
   }, [inView])

   return (
      <ul className={styles.news__list}>
         {news &&
            news.map(item => (
               <li key={item.id} className={styles.news__item}>
                  <p className={styles.news__createdAt}>{dateFormatter(item.createdAt)}</p>
                  <div className={styles.news__inner}>
                     <a href={`/news/${item.id}`} className={styles.news__title}>{item.title}</a>
                     <p className={styles.news__content}>{titleCutter(item.content, 220)}</p>
                  </div>
               </li>
            ))
         }
         <p ref={ref}></p>
      </ul>
   )
}

export default NewsList