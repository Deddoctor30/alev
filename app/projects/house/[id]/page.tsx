import { Suspense } from "react";
import Loading from "@/app/components/loading/Loading";
import CurrentProject from "@/app/components/currentProject/CurrentProject";

const page = async ({ params }: { params: { id: string } }) => {

  return (
    <Suspense fallback={<Loading />}>
      <CurrentProject id={params.id}/>
    </Suspense>
  );
};

export default page;
