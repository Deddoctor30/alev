import Loading from '@/app/components/loading/Loading';
import PostsList from '@/app/components/postsList/PostsList';
import { Suspense } from 'react';

const page = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <PostsList type='PUBLIC'/>
    </Suspense>
  )
}

export default page