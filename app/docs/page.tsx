'use client'
import { Suspense, useEffect, useState } from 'react';
import { downloadFiles } from '@/types/downloadFiles';
import { getDownloadAll } from '../actions/downloadActions';
import { Docs } from '@/types/docs';
import { DownloadItems } from '../components/downloadItems/DownloadItems';
import Loading from '../components/loading/Loading';
import { message } from 'antd';
import styles from './page.module.scss'

const Page = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [downloadStatus, setDownloadStatus] = useState<downloadFiles>({ message: 'Ожидание загрузки', status: '' });
  const [data, setData] = useState<Docs[] | null | undefined>(null)
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

  return (
    <Suspense fallback={<Loading />}>
      <div className={styles.docs}>
        <div className={styles.wrapper}>
          <h1 className={styles.docs__rank}>Документы</h1>
          <DownloadItems setDownloadStatus={setDownloadStatus} data={data}/>
        </div>
      </div>
    </Suspense>
  )
}

export default Page