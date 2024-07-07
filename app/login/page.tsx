// 'use client'
import LoginForm from '../components/logingForm/LoginForm';
import styles from './page.module.scss'

import { auth } from "@/auth"

const page = async () => {
   const session = await auth()
  return (
   <div className={styles.wrapper}>
      <div className={styles.inner}>
         <LoginForm session={session}/>
      </div>
   </div>
  )
}

export default page