import prisma from '@/lib/db'
import styles from './page.module.scss'

const page = async ()  => {
  const news = await prisma.news.findMany()

  return (
    <div className={styles.news}>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          {news.map(item => (
            <li key={item.id} className={styles.item}>
              <h2 className={styles.item__title}>{item.title}</h2>
              <p className={styles.item__text}>{item.content}</p>
            </li>
          ))
          }
        </ul>
      </div>
    </div>
  )
}

export default page