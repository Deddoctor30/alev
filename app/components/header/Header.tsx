import { navLinks } from "@/data/navLinks"
import Link from "../Link"
import styles from "./header.module.scss"
import { metaData } from "@/data/metaData";

const Header = () => {

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <a href={'/'}>
            <img className={styles.image} src={metaData.siteLogo.path} alt={metaData.siteLogo.alt} />
          </a>
          {/* <Image className={styles.image} src={} alt={metaData.siteLogo.alt} width={metaData.siteLogo.width} height={metaData.siteLogo.height} priority/> */}
        </div>
         <div className={styles.items}>
           {navLinks
            // .filter(link => link.href !== '/')
            .map(link =>
                <Link className={`${styles.item} ${styles.active_link}`} href={link.href} key={link.title}>{link.title}</Link>
           )}
         </div>
      </div>
    </header>
  )
}

export default Header