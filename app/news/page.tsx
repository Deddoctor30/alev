import prisma from '@/lib/db'
import styles from './page.module.scss'
import { Suspense } from 'react'
import Loading from '../components/loading/Loading'
import { dateFormatter } from '../utils/dateFormatter'
import { titleCutter } from '../utils/titleCutter'

const page = async ()  => {
  const news = await prisma.news.findMany()

  return (
    <Suspense fallback={<Loading/>}>
      <div className={styles.news}>
        <div className={styles.wrapper}>
          <ul className={styles.news__list}>
            {news.map(item => (
              <li key={item.id} className={styles.news__item}>
                <p className={styles.news__createdAt}>{dateFormatter(item.createdAt)}</p>
                <div className={styles.news__inner}>
                  <h3 className={styles.news__title}>{item.title}</h3>
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