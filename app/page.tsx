import styles from "./page.module.scss";
import Image from 'next/image'
import one from '@/public/images/1.jpg';
import two from '@/public/images/2.jpg';
import three from '@/public/images/3.jpg';
import four from '@/public/images/4.jpg';
import Link from "next/link";

import Button from "./UI/Button/Button";
// import create from "./actions/createUser";
import { createPosts } from "./actions/createPosts";

export default function Home() {
  // createPosts()

 
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.center}>
          <div className={styles.center__left}>
            <h1>Алев Групп</h1>
            <p>архитектурно-проектное бюро</p>
          </div>
          <div className={styles.center__right}>
            <p>С момента основания в 2019 году наша команда реализовала 49 крупных проектов на территории Москвы, Московской области и в других городах России. Наша работа начинается с детальной проработки концепции, разработки АГО, АХО и других разрешаюших документов. После чего начинается стадия проектирования, которая включает в себя разработку проектной и рабочей документации. Кроме того мы предоставляем услуги технадзора и сопровождаем объект вплоть до его ввода в эксплуатацию.</p>
            <Link className={styles.center__link} href='/about'>Связаться с нами</Link>
          </div>
          {/* <Button title={'Добавить пользователя'} action={create}/> */}
        </div>
        <div className={styles.promo}>
            <div className={styles.promo__item}>
              <Image src={one} alt="first" />
            </div>
            <div className={styles.promo__item}>
              <Image src={two} alt="first" />
            </div>
            <div className={styles.promo__item}>
              <Image src={three} alt="first" />
            </div>
            <div className={styles.promo__item}>
              <Image src={four} alt="first" />
            </div>
        </div>
      </div>
        <div className={styles.clients}>
          <h2 className={styles.clients__partners}>Наши партнеры</h2>
          <ul className={styles.clients__items}>
            <li className={styles.clients__item}><img src='images/mosinj.jpg' alt="mosinj" /></li>
            <li className={styles.clients__item}><img src='images/mosinj.jpg' alt="mosinj" /></li>
            <li className={styles.clients__item}><img src='images/mosinj.jpg' alt="mosinj" /></li>
            <li className={styles.clients__item}><img src='images/3213.jpg' alt="mosinj" /></li>
            <li className={styles.clients__item}><img src='images/minss.png' alt="mosinj" /></li>
          </ul>
        </div>
    </main>
  );
}
