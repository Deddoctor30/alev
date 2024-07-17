import { Docs } from "@/types/docs"
import { Button, message } from 'antd';
import Image from 'next/image'
import { download } from "@/app/utils/download";
// import noFile from '@/public/images/no_image.png';

import styles from './downloadItems.module.scss';
import { Dispatch, SetStateAction } from "react";
import { downloadFiles } from "@/types/downloadFiles";
import { dateFormatter } from "@/app/utils/dateFormatter";

export const DownloadItems = ({ data, setDownloadStatus }: { data: Docs[] | null, setDownloadStatus: Dispatch<SetStateAction<downloadFiles>> }) => {
   const downloadHandler = (id: number, path: string) => {
      setDownloadStatus({ status: 'pending', message: '' })
      download(path, setDownloadStatus, id)
   }
   return (
      <ul className={styles.docs__items}>
         {data?.map(item =>
            <li key={item.id} className={styles.docs__item}>
                  {item.thumbnail.length > 0 &&
                     <Image className={styles.docs__img} priority src={`/images/${item.thumbnail.at(0)}`} height={600} width={600} alt={item.name ? item.name : 'Картинка'} />
                  }
               <div className={styles.docs__inner}>
                  <p className={styles.docs__createdAt}>{dateFormatter(item.createdAt)}</p>
                  <h2 className={styles.docs__title}>{item.title}</h2>
                  <p className={styles.docs__content}>{item.content}</p>
                  <div className={styles.docs__group}>
                     <Button className={styles.docs__btn} type='default' size='large' onClick={() => downloadHandler(item.id, item.path)}>Скачать файл</Button>
                  </div>
               </div>
            </li>
         )}
      </ul>
   )
}