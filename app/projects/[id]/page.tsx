import Image from 'next/image'
import styles from './page.module.scss'
import one from '@/public/images/21.jpg';
import two from '@/public/images/22.jpg';
import three from '@/public/images/23.jpg';
import four from '@/public/images/24.jpg';

const page = () => {
  return (
    <div className={styles.project}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Проект центра семейного отдыха</h1>
        <div className={styles.content}>
          <div className={styles.content__img}>
            <Image src={one} alt='123'/>
          </div>
          <div className={styles.content__inner}>
            <p className={styles.content__description}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam odit ipsam maxime.</p>
            <p className={styles.content__autors}>Авторский состав:</p>
            <ul className={styles.content__list}>
              <li className={styles.content__item}>Lorem, ipsum.</li>
              <li className={styles.content__item}>Lorem, ipsum.</li>
              <li className={styles.content__item}>Lorem, ipsum.</li>
            </ul>
          </div>
        </div>
      </div>
      <h2 className={styles.subtitle}>Галерея</h2>
      <div className={styles.galery}>
        <div className={styles.galery__item}>
          <Image src={one} alt='123'/>
        </div>
        <div className={styles.galery__item}>
          <Image src={two} alt='123'/>
        </div>
        <div className={styles.galery__item}>
          <Image src={three} alt='123'/>
        </div>
        <div className={styles.galery__item}>
          <Image src={four} alt='123'/>
        </div>
      </div>
    </div>
  )
}

export default page