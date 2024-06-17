'use client'
import Image from 'next/image'
import styles from './page.module.scss'

import two from '@/public/images/castcom_brandbook.jpg';
import { getDocument } from '../actions/docsActions';
import { useEffect, useState } from 'react';

const page = () => {
  const [data, setData] = useState('')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchData = async () => {
       const fetchedData = await getDocument()
       setData(fetchedData)
    }
    fetchData()
 }, [])

  return (
    <div className={styles.docs}>
      <div className={styles.wrapper}>
        <ul className={styles.docs__items}>
          <li className={styles.docs__item}>
              <h2 className={styles.docs__title}>{'Брендбук ООО "Алев Групп"'}</h2>
              <div className={styles.docs__inner}>
                <Image src={two} width={200} alt='123'/>
                <a href={'wad'} download={true} className={styles.docs__content}>Скачать Брендбук</a>
                {/* <button onClick={() => getDocument()}>Скачать</button> */}
              </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default page