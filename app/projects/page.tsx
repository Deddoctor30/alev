import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";
import { Suspense } from "react";
import prisma from "@/lib/db";
import Loading from "../components/loading/Loading";
import PageNavigation from "../components/pageNavigation/PageNavigation";

const page = async () => {
  const projects = await prisma.post.findMany();

  return (
    <Suspense fallback={<Loading />}>
      <div className={styles.projects}>
        <div className={styles.wrapper}>
          <PageNavigation />

          <div className={styles.items}>
            {projects.map((item) => (
              <div key={item.id} className={styles.items__item}>
                <Link className={styles.items__link} href={`/projects/${item.type.toLowerCase()}/${item.id}`}>
                  <div className={styles.items__inner}>
                    <p className={styles.items__subtitle}>{item.title}</p>
                  </div>
                  <Image
                    src={`/images/posts/${item?.thumbnail[0]}`}
                    width={500}
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
  );
};

export default page;
