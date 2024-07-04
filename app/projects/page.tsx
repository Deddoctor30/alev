import styles from "./page.module.scss";
import { Suspense } from "react";
import Loading from "../components/loading/Loading";
import PageNavigation from "../components/pageNavigation/PageNavigation";
import { getOnProjectsPosts } from "../actions/postActions";
import ProjectList from "../components/projectList/ProjectList";

const page = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className={styles.projects}>
        <div className={styles.wrapper}>
          <h1 className={styles.projects__title}>Проекты</h1>
          <PageNavigation />
          <ProjectList/>
        </div>
      </div>
    </Suspense>
  );
};

export default page;
