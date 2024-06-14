import Loading from '@/app/components/loading/Loading';
import PostsList from '@/app/components/postsList/PostsList';
import { Suspense } from 'react';

const page = async ()  => {
  return (
    <Suspense fallback={<Loading/>}>
      <PostsList type='HOUSE'/>
    </Suspense>
  )
}

export default page