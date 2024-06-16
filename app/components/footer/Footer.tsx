import styles from './footer.module.scss'
import { getAbout } from '@/app/actions/aboutActions'

const Footer = async () => {
  const about = await getAbout()

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <ul className={styles.items}>
              <li className={styles.item}><a href="#">Политика конфиденциальности</a></li>
              <li> • </li>
              <li className={styles.item}><a href="#">Положение об обработке личных данных</a></li>
            </ul>
            <ul className={styles.items}>
              <li className={styles.item}><a href={about?.at(0)?.yandex} target='_blank'>{about?.at(0)?.address}</a></li>
              <li> • </li>
              <li className={styles.item}><a href={`tel:${about?.at(0)?.phone}`}>{about?.at(0)?.phone}</a></li>
              <li> • </li>
              <li className={styles.item}><a href={`mailto:${about?.at(0)?.email}`}>{about?.at(0)?.email}</a></li>
          </ul>
          <div className={styles.date}>{`© ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer