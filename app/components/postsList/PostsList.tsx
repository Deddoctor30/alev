import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/db";
import { Suspense } from "react";
import Loading from "../loading/Loading";
import PageNavigation from "../pageNavigation/PageNavigation";
import styles from "./postsList.module.scss";

type Type = "HOUSE" | "MARKET" | "OFFICE" | "PUBLIC";

const page = async ({ type }: { type: Type }) => {
  const houses = await prisma.post.findMany({
    where: {
      type: type,
    },
  });

  // const titleFnc = () => {
  //  switch (type) {
  //     case 'HOUSE':
  //      return 'Проекты жилых домов'
  //  }
  //  switch (type) {
  //     case 'MARKET':
  //      return 'Проекты торговых зданий'
  //  }
  //  switch (type) {
  //     case 'OFFICE':
  //      return 'Проекты офисных зданий'
  //  }
  //  switch (type) {
  //     case 'PUBLIC':
  //      return 'Проекты общественных зданий'
  //  }
  // }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className={styles.projects}>
          <div className={styles.wrapper}>
            <PageNavigation />

            <div className={styles.items}>
              {houses.map((item) => (
                <div key={item.id} className={`${styles.items__item} ${styles.item}`}>
                  <Link
                    className={styles.item__link}
                    href={`/projects/${type.toLowerCase()}/${item.id}`}
                  >
                    <div className={styles.item__inner}>
                      <p className={styles.item__subtitle}>{item.title}</p>
                    </div>
                    <Image
                      className={styles.item__img}
                      src={`/images/posts/${item?.thumbnail[0]}`}
                      width={600}
                      height={400}
                      alt={item.title}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default page;
