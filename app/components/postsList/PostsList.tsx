
import { Suspense } from "react";
import Loading from "../loading/Loading";
import PageNavigation from "../pageNavigation/PageNavigation";
import styles from "./postsList.module.scss";
import PostsListCurrent from "../postsListCurrent/PostsListCurrent";

type Type = "HOUSE" | "MARKET" | "OFFICE" | "PUBLIC";

const page = async ({ type }: { type: Type }) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className={styles.projects}>
          <div className={styles.wrapper}>
          <h1 className={styles.projects__title}>Проекты</h1>
            <PageNavigation />
            <PostsListCurrent type={type}/>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default page;
