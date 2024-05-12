import styles from './footer.module.scss'

const Footer = () => {
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
              <li className={styles.item}><a href="https://yandex.ru/maps/-/CDV2jJ40" target='_blank'>Москва, улица Усачёва, 10с1</a></li>
              <li> • </li>
              <li className={styles.item}><a href="tel:+74951111111">+7 (495) 111 11 11</a></li>
              <li> • </li>
              <li className={styles.item}><a href="mailto:alevpost@mail.ru">alevpost@mail.ru</a></li>
          </ul>
          <div className={styles.date}>© 2024</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer