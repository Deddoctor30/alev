'use client'
import Image from 'next/image'
// import noFile from '@/public/images/no_image.png';
import { useEffect, useState } from 'react';
import { download } from '../utils/download';
import { Button, message } from 'antd';

import styles from './page.module.scss'
import { downloadFiles } from '@/types/downloadFiles';
import { getDownloadAll } from '../actions/downloadActions';
import { Docs } from '@/types/docs';

const Page = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [downloadStatus, setDownloadStatus] = useState<downloadFiles>({ message: 'Ожидание загрузки', status: '' });
  const [data, setData] = useState<Docs[] | null>(null)
  // const docs = await prisma.docs.findMany()
  useEffect(() => {
    const fetchData = async () => {
       const fetchedData = await getDownloadAll()
       fetchedData && setData(fetchedData)
    }
    fetchData()
 }, [])

  useEffect(() => {
    switch (downloadStatus?.status) {
      case ('pending'):
        warning()
        break;
      case ('success'):
        success()
        break;
      case ('error'):
        error()
        break;
    }
  }, [downloadStatus])

  const downloadHandler = (id: number, path: string) => {
    setDownloadStatus({status: 'pending', message: ''})
    download(path, setDownloadStatus, id)
  }

  const success = () => {
    messageApi.open({
      type: 'success',
      content: downloadStatus?.message,
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: downloadStatus?.message,
    });
  };

  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'Ожидание загрузки',
    });
  };

  console.log(data);
  

  return (
    <div className={styles.docs}>
      <div className={styles.wrapper}>
        {contextHolder}
        <ul className={styles.docs__items}>
          {data?.map(item =>
            <li key={item.id} className={styles.docs__item}>
                <h2 className={styles.docs__title}>{item.title}</h2>
                <div className={styles.docs__inner}>
                  {item.thumbnail.length > 0 &&
                    <Image className={styles.docs__thumb} src={`/images/files/${item.thumbnail.at(0)}`} height={500} width={200} alt={item.name ? item.name : 'Картинка'}/>
                   }
                  <p className={styles.docs__content}>{item.content}</p>
                  <div className={styles.docs__group}>
                    <Button type='default' size='large' onClick={() => downloadHandler(item.id, item.path)}>Скачать файл</Button>
                  </div>
                </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Page