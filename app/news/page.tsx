import styles from './page.module.scss'

const page = () => {
  return (
    <div className={styles.news}>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <h2 className={styles.item__title}>Lorem ipsum dolor sit amet consectetur.</h2>
            <p className={styles.item__text}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas provident quae porro sunt. Dolorem perferendis accusantium voluptates explicabo atque veritatis deleniti, quibusdam at, modi tenetur voluptas necessitatibus excepturi ducimus molestias.
              Corporis ad, quas harum veritatis sed, in quibusdam, ex amet quam incidunt a hic soluta reiciendis blanditiis cum exercitationem. Perferendis eaque sequi magnam doloremque natus, distinctio sint harum suscipit incidunt.
            </p>
          </li>
          <li className={styles.item}>
            <h2 className={styles.item__title}>Lorem ipsum dolor sit amet consectetur.</h2>
            <p className={styles.item__text}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas provident quae porro sunt. Dolorem perferendis accusantium voluptates explicabo atque veritatis deleniti, quibusdam at, modi tenetur voluptas necessitatibus excepturi ducimus molestias.
              Corporis ad, quas harum veritatis sed, in quibusdam, ex amet quam incidunt a hic soluta reiciendis blanditiis cum exercitationem. Perferendis eaque sequi magnam doloremque natus, distinctio sint harum suscipit incidunt.
            </p>
          </li>
          <li className={styles.item}>
            <h2 className={styles.item__title}>Lorem ipsum dolor sit amet consectetur.</h2>
            <p className={styles.item__text}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas provident quae porro sunt. Dolorem perferendis accusantium voluptates explicabo atque veritatis deleniti, quibusdam at, modi tenetur voluptas necessitatibus excepturi ducimus molestias.
              Corporis ad, quas harum veritatis sed, in quibusdam, ex amet quam incidunt a hic soluta reiciendis blanditiis cum exercitationem. Perferendis eaque sequi magnam doloremque natus, distinctio sint harum suscipit incidunt.
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default page