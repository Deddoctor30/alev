import { Suspense } from "react";
import Loading from "../components/loading/Loading";
import PageNavigation from "../components/pageNavigation/PageNavigation";
import ProjectList from "../components/projectList/ProjectList";
import styles from "./page.module.scss";

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
