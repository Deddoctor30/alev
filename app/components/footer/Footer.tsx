import { phoneNumberReplacer } from "@/app/utils/phoneNumberReplacer";
import styles from "./footer.module.scss";
import { getAbout } from "@/app/actions/aboutActions";

const Footer = async () => {
  const about = await getAbout();

  return (
    <footer className={styles.footer}>
      <h2 className={styles.footer__mark}>Alev Group</h2>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <ul className={styles.items}>
            <li className={styles.item}>
              <a href="/police">Политика конфиденциальности</a>
            </li>
            <li className={styles.point}> • </li>
            <li className={styles.item}>
              <a href="/personal">Положение об обработке личных данных</a>
            </li>
          </ul>
          {about && (
            <ul className={styles.items}>
              <li className={styles.item}>
                <a href={about.yandex} target="_blank">
                  {about.address}
                </a>
              </li>
              <li className={styles.point}> • </li>
              <li className={styles.item}>
                <a href={`tel:${about.phone}`}>
                  {phoneNumberReplacer(about.phone)}
                </a>
              </li>
              <li className={styles.point}> • </li>
              <li className={styles.item}>
                <a href={`mailto:${about.email}`}>
                  {about.email}
                </a>
              </li>
            </ul>
          )}
          <div className={styles.date}>{`© ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
