import Image from 'next/image'
import one from '@/public/images/default-avatar.jpg';
import style from './page.module.scss'
import { getContacts } from '../actions/contactsActions';
import { getUsers } from '../actions/userActions';

const page = async () => {
  const contacts  = await getContacts()
  const users  = await getUsers()
  
  // const deal = await prisma.deal.findMany({
  //   orderBy: {
  //     createdAt: 'desc'
  //   }
  // })

  return (
    <div className={style.about}>
      <div className={style.wrapper}>
        <div className={style.contacts}>
          <h2 className={style.contacts__title}>Связаться с нами</h2>
          <ul className={style.contacts__items}>
            {contacts.map(item => 
              <li key={item.id} className={style.contacts__item}>
                <h3>{item.point}</h3>
                <p>{item.email}</p>
                <p>{item.phone}</p>
              </li>
            )}

          </ul>
        </div>
          <div className={style.management}>
            <h2 className={style.management__title}>Наше руководство</h2>
            <ul className={style.management__items}>
              {users.map(item => 
                <li key={item.id} className={style.management__item}>
                  <img className={style.management__img} src={`/images/user/${item.avatar}`} alt={item.avatar}/>
                  <div className={style.management__inner}>
                    <h3>{item.position}</h3>
                    <p>{item.name}</p>
                  </div>
                </li>

              )}
              {/* <li className={style.management__item}>
                <Image className={style.management__img} src={one} alt='123'/>
                <div className={style.management__inner}>
                  <h3>Директор</h3>
                  <p>Иванов И.awdawdadwИ.</p>
                </div>
              </li>
              <li className={style.management__item}>
                <Image className={style.management__img} src={one} alt='123'/>
                <div className={style.management__inner}>
                  <h3>Директор</h3>
                  <p>Иванов И.И.</p>
                </div>
              </li>
              <li className={style.management__item}>
                <Image className={style.management__img} src={one} alt='123'/>
                <div className={style.management__inner}>
                  <h3>Директор</h3>
                  <p>Иванов И.И.</p>
                </div>
              </li>
              <li className={style.management__item}>
                <Image className={style.management__img} src={one} alt='123'/>
                <div className={style.management__inner}>
                  <h3>Директор</h3>
                  <p>Иванов И.И.</p>
                </div>
              </li> */}

            </ul>
          </div>
        <h2 className={style.coordinates}>Мы находимся по адресу</h2>
        <div className={style.container}>
          <div className={style.map} style={{position:'relative', overflow:"hidden"}}>
            <a href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps" style={{color:"#eee", fontSize:"12px", position:"absolute", top:"0px"}}>Москва</a>
            <a href="https://yandex.ru/maps/213/moscow/?ll=37.571645%2C55.728693&mode=whatshere&utm_medium=mapframe&utm_source=maps&whatshere%5Bpoint%5D=37.571531%2C55.728731&whatshere%5Bzoom%5D=20&z=19" style={{color:"#eee", fontSize:"12px", position:"absolute", top:"14px"}}>Улица Усачёва, 10с1 — Яндекс Карты</a>
            <iframe src="https://yandex.ru/map-widget/v1/?ll=37.572494%2C55.728616&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NjY5NDI1NBI80KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINGD0LvQuNGG0LAg0KPRgdCw0YfRkdCy0LAsIDEw0YExIgoN8UgWQhVc6l5C&utm_source=ntp_chrome&z=17.71" width="100%" height="100%" frameBorder="1" allowFullScreen={true} style={{position:"relative"}}></iframe>
          </div>
          {/* <div className={style.right}>
            <p>Москва, улица Усачёва, дом 10с1</p>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default page