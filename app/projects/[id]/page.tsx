import Image from 'next/image'
import styles from './page.module.scss'
import one from '@/public/images/21.jpg';
import two from '@/public/images/22.jpg';
import three from '@/public/images/23.jpg';
import four from '@/public/images/24.jpg';
import prisma from '@/lib/db';


import noImg from '@/public/images/no_image.png';

const page = async ({ params }: { params: { id: string } }) => {

  const posts = await prisma.post.findUnique({
    where: {
      id: Number(params.id)
    }
  })

  return (
    <div className={styles.project}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{posts?.title}</h1>
        <div className={styles.content}>
          <div className={styles.content__img}>
            <img src={`/images/posts/${posts?.thumbnail}`} alt={posts?.thumbnail}/>
            {/* <Image src={project?.thumbnail ? project?.thumbnail : noImg} width={500} height={600} alt={project?.title ? project?.title : 'null'}/> */}
          </div>
          <div className={styles.content__inner}>
            <p className={styles.content__description}>{posts?.content}</p>
            <p className={styles.content__autors}>Авторский состав:</p>
            <ul className={styles.content__list}>
              <li className={styles.content__item}>ГИП проекта: {posts?.gip}</li>
              <li className={styles.content__item}>ГИП проекта: {posts?.gap}</li>
            </ul>
          </div>
        </div>
      </div>



      {/* // ДОДЕЛАТЬ ниже */}



      <h2 className={styles.subtitle}>Галерея</h2>
      <div className={styles.galery}>
        {posts?.gallery.map(item => 
          <div className={styles.galery__item}>
            <img src={`/images/posts/${item}`} alt={item}/>
          </div>

        )}
        {/* <div className={styles.galery__item}>
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
        </div> */}
      </div>
    </div>
  )
}

export default page