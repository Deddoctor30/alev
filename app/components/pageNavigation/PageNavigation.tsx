'use client'
import styles from './pageNavigation.module.scss'
import { usePathname } from 'next/navigation';
import { pageLinks } from '@/data/pageLinks';
import PageLink from '../pageLink/PageLink';

const PageNavigation = () => {
   const pathname = usePathname();
  return (
    <div className={styles.navigation}>
      <ul className={styles.navigation__list}>
         {pageLinks.map(item => 
            <li key={item.title} className={styles.navigation__item}>
               <PageLink className={styles.navigation__item} href={item.href}>{item.title}</PageLink>
            </li>
         )}
      </ul>
    </div>
  );
};

export default PageNavigation;
