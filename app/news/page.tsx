import prisma from '@/lib/db'
import styles from './page.module.scss'
import { Suspense } from 'react'
import Loading from '../components/loading/Loading'
import { dateFormatter } from '../utils/dateFormatter'

const page = async ()  => {
  const news = await prisma.news.findMany()

  return (
    <Suspense fallback={<Loading/>}>
      <div className={styles.news}>
        <div className={styles.wrapper}>
          <ul className={styles.list}>
            {news.map(item => (
              <li key={item.id} className={styles.item}>
                <p className={styles.news__createdAt}>{dateFormatter(item.createdAt)}</p>
                <h2 className={styles.item__title}>{item.title}</h2>
                <p className={styles.item__text}>{item.content}</p>
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