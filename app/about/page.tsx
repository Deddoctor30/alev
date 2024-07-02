import Image from 'next/image'
import style from './page.module.scss'
import { getContacts } from '../actions/contactsActions';
import { getUsers } from '../actions/userActions';
import { positionFnc } from '../utils/position';
import { Suspense } from 'react';
import Loading from '../components/loading/Loading';
import { phoneNumberReplacer } from '../utils/phoneNumberReplacer';

const page = async () => {
  const contacts = await getContacts()
  const users = await getUsers()

  return (
    <Suspense fallback={<Loading />}>
      <div className={style.about}>
        <div className={style.wrapper}>
          <div className={style.management}>
            <h2 className={style.management__title}>Наше руководство</h2>
            <ul className={style.management__items}>
              {users?.map(item =>
                <li key={item.id} className={style.management__item}>
                  <Image className={style.management__img} src={item.avatar.length !== 0 ? `/images/user/${item.avatar}` : '/images/default-avatar.jpg'} width={500} height={600} alt={item.avatar.at(0) || 'avatar'} />
                  <div className={style.management__inner}>
                    <h3>{positionFnc(item.position)}</h3>
                    <p>{item.name}</p>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <div className={style.contacts}>
            <h2 id='connection' className={style.contacts__title}>Связаться с нами</h2>
            <ul className={style.contacts__items}>
              {contacts?.map(item =>
                <li key={item.id} className={style.contacts__item}>
                  <h3>{item.point}</h3>
                  <p>{item.email}</p>
                  <a href={`tel:${item.phone}`}>{phoneNumberReplacer(item.phone)}</a>
                </li>
              )}
            </ul>
          </div>
          <h2 className={style.coordinates}>Мы находимся по адресу</h2>
          <div className={style.container}>
            <div className={style.map} style={{ position: 'relative', overflow: "hidden" }}>
              <a href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px" }}>Москва</a>
              <a href="https://yandex.ru/maps/213/moscow/?ll=37.571645%2C55.728693&mode=whatshere&utm_medium=mapframe&utm_source=maps&whatshere%5Bpoint%5D=37.571531%2C55.728731&whatshere%5Bzoom%5D=20&z=19" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px" }}>Улица Усачёва, 10с1 — Яндекс Карты</a>
              <iframe src="https://yandex.ru/map-widget/v1/?ll=37.572494%2C55.728616&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NjY5NDI1NBI80KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINGD0LvQuNGG0LAg0KPRgdCw0YfRkdCy0LAsIDEw0YExIgoN8UgWQhVc6l5C&utm_source=ntp_chrome&z=17.71" width="100%" height="100%" frameBorder="1" allowFullScreen={true} style={{ position: "relative" }}></iframe>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default page