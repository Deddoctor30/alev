import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";
import { Suspense } from "react";
import prisma from "@/lib/db";
import Loading from "../components/loading/Loading";
import PageNavigation from "../components/pageNavigation/PageNavigation";
import { getOnProjectsPosts } from "../actions/postActions";
import ProjectList from "../components/projectList/ProjectList";

const page = async () => {
  const projects = await getOnProjectsPosts(0, 3);

  return (
    <Suspense fallback={<Loading />}>
      <div className={styles.projects}>
        <div className={styles.wrapper}>
          <h1 className={styles.projects__title}>Проекты</h1>
          <PageNavigation />
          <ProjectList/>
          {/* <div className={styles.items}>
            {projects.map((item) => (
              <div key={item.id} className={`${styles.items__item} ${styles.item}`}>
                <Link className={styles.item__link} href={`/projects/${item.type.toLowerCase()}/${item.id}`}>
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
          </div> */}
        </div>
      </div>
    </Suspense>
  );
};

export default page;
