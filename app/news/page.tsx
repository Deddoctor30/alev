import prisma from '@/lib/db'
import styles from './page.module.scss'
import { Suspense } from 'react'
import Loading from '../components/loading/Loading'
import { dateFormatter } from '../utils/dateFormatter'
import { titleCutter } from '../utils/titleCutter'
import { getNewsAll } from '../actions/newsActions'

const page = async () => {
  const news = await getNewsAll()

  return (
    <Suspense fallback={<Loading />}>
      <div className={styles.news}>
        <div className={styles.wrapper}>
          <h1 className={styles.news__rank}>Новости</h1>
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
          </ul>
        </div>
      </div>
    </Suspense>
  )
}

export default page