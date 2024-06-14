import { navLinks } from "@/data/navLinks"
import Image from 'next/image'
import Link from "../Link"
import { metaData } from "@/data/metaData";
import styles from "./header.module.scss"

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <a href={'/'}>
            <Image className={styles.image} src={metaData.siteLogo.path} alt={metaData.siteLogo.alt} width={188} height={50} priority/>
          </a>
        </div>
         <div className={styles.items}>
           {navLinks
            .map(link =>
                <Link className={`${styles.item} ${styles.active_link}`} href={link.href} key={link.title}>{link.title}</Link>
           )}
         </div>
      </div>
    </header>
  )
}

export default Header