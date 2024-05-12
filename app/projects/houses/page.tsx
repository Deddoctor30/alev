import Image from 'next/image'
import Link from 'next/link';
import styles from './page.module.scss'
import one from '@/public/images/21.jpg';
import two from '@/public/images/22.jpg';
import three from '@/public/images/23.jpg';

const page = () => {
  return (
    <div className={styles.houses}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Проекты жилых домов</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href='/projects/1'>
              <div className={styles.item__img}>
                <Image src={one} alt="first" />
              </div>
              <p className={styles.item__description}>Lorem ipsum dolor sit amet.</p>
            </Link>
          </li>

          <li className={styles.item}>
            <Link href='/projects/1'>
              <div className={styles.item__img}>
                <Image src={two} alt="first" />
              </div>
              <p className={styles.item__description}>Lorem ipsum dolor sit amet.</p>
            </Link>
          </li>

          <li className={styles.item}>
            <Link href='/projects/1'>
              <div className={styles.item__img}>
                <Image src={three} alt="first" />
              </div>
              <p className={styles.item__description}>Lorem ipsum dolor sit amet.</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default page