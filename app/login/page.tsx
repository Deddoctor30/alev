import LoginForm from '../components/logingForm/LoginForm';
import styles from './page.module.scss'

const page = () => {

  return (
   <div className={styles.wrapper}>
      <div className={styles.inner}>
         <LoginForm/>
      </div>
   </div>
  )
}

export default page