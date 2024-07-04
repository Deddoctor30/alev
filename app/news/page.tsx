import styles from './page.module.scss'
import { Suspense } from 'react'
import Loading from '../components/loading/Loading'
import NewsList from '../components/newsList/NewsList'

const page = async () => {

  return (
    <Suspense fallback={<Loading />}>
      <div className={styles.news}>
        <div className={styles.wrapper}>
          <h1 className={styles.news__rank}>Новости</h1>
          <NewsList/>
        </div>
      </div>
    </Suspense>
  )
}

export default page