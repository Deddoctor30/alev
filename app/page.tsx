import Link from "next/link";
import { getMain } from "./actions/mainActions";
import { getOnMainPosts, getPosts } from './actions/postActions';
import { Suspense } from 'react';
import Loading from './components/loading/Loading';

import styles from "./page.module.scss";
import MainImgLoader from './components/mainImgLoader/MainImgLoader';
import MainImgThumbs from './components/mainImgThumbs/MainImgThumbs';

export default async function Home() {
  const main = await getMain()
  const posts = await getOnMainPosts() 

  return (
    <Suspense fallback={<Loading />}>
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.center}>
            <div className={styles.center__left}>
              <h1>Алев Групп</h1>
              <p>{main?.title}</p>
            </div>
            <div className={styles.center__right}>
              <p>{main?.content}</p>
              {/* <p>С момента основания в 2019 году наша команда реализовала 49 крупных проектов на территории Москвы, Московской области и в других городах России. Наша работа начинается с детальной проработки концепции, разработки АГО, АХО и других разрешаюших документов. После чего начинается стадия проектирования, которая включает в себя разработку проектной и рабочей документации. Кроме того мы предоставляем услуги технадзора и сопровождаем объект вплоть до его ввода в эксплуатацию.</p> */}
              <Link className={styles.center__link} href='/about'>Связаться с нами</Link>
            </div>
          </div>
          {posts &&
            <MainImgThumbs data={posts}/>
          }
          {/* <div className={styles.promo}>
            {posts?.map(item =>
              <div key={item.id} className={styles.promo__item}>
                <div className={styles.promo__inner}>
                  <p className={styles.promo__subtitle}>{item.title}</p>
                  <p className={styles.promo__content}>{item.content.length > 220 ? `${item.content.slice(0, 220)}...` : item.content}</p>
                </div>
                <Link className={styles.promo__links} href={`/projects/${item.type.toLowerCase()}/${item.id}`}>
                  <Image src={`/images/posts/${item.thumbnail}`} width={1600} height={800} alt={`${item}`} />
                </Link>
              </div>
            )}
          </div> */}
        </div>
        {main &&
          <MainImgLoader data={main?.gallery} />
        }
      </main>
    </Suspense>
  );
}
