'use client'
import { navLinks } from "@/data/navLinks"
import Image from 'next/image'
import Link from "../Link"
import { metaData } from "@/data/metaData";
import styles from "./header.module.scss"
import { Dispatch, SetStateAction, useState } from "react";

const Header = () => {
  const [burgerActive, setBurgerActive] = useState(false)
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.header__logo}>
          <a href={'/'}>
            <Image className={styles.header__image} src={metaData.siteLogo.path} alt={metaData.siteLogo.alt} width={188} height={50} priority/>
          </a>
        </div>
         <nav className={burgerActive ? styles.header__coscader : styles.header__items}>
           {navLinks
            .map(link =>
                <Link setBurgerActive={setBurgerActive} className={`${styles.header__item} ${styles.active_link}`} href={link.href} key={link.title}>{link.title}</Link>
           )}
         </nav>
         <div className={styles.header__rightBar}>
          <div className={styles.header__inner}></div>
          <div className={burgerActive ? styles.header__navBtnOpened : styles.header__navBtn} onClick={() => setBurgerActive(state => !state)}>
            <span />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header