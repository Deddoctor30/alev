"use client"
import styles from './button.module.scss'

const Button = ({ action, title }: { action: any, title: string | number }) => {
  return (
    <button className={styles.button} onClick={() => action()}>{title}</button>
  )
}

export default Button