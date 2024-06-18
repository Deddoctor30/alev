'use client'
import Image from 'next/image'
import two from '@/public/images/castcom_brandbook.jpg';
import { useState } from 'react';
import { download } from '../utils/download';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Button } from 'antd';

import styles from './page.module.scss'
import { downloadFiles } from '@/types/downloadFiles';

const Page = () => {
  const [downloadStatus, setDownloadStatus] = useState<downloadFiles>({ message: 'Ожидание загрузки', status: '' });

  const downloadHandler = () => {
    setDownloadStatus({status: 'pending', message: ''})
    download('/api/download/brandbook', setDownloadStatus)
  }
  
  return (
    <div className={styles.docs}>
      <div className={styles.wrapper}>
        <ul className={styles.docs__items}>
          <li className={styles.docs__item}>
              <h2 className={styles.docs__title}>{'Брендбук Алев Групп'}</h2>
              <div className={styles.docs__inner}>
                <Image src={two} width={200} alt='123'/>
                <p className={styles.docs__content}>Официальный Брендбук компании Алев Групп включает в себя все реализуемые объекты в современном формате</p>
                <div className={styles.docs__group}>
                  <Button type='default' size='large' onClick={() => downloadHandler()}>Скачать файл</Button>
                  {downloadStatus?.status === 'pending' && <Spin className={styles.docs__status} style={{marginTop: '20px'}} size='default' />}
                  {downloadStatus?.status === 'success' && <p className={styles.docs__status}>{downloadStatus?.message}</p>}
                  {downloadStatus?.status === 'error' && <p className={styles.docs__status}>{downloadStatus?.message}</p>}
                </div>
              </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Page