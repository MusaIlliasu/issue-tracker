import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const loading = () => {

  return (
    <>
        <h1 className="w-[200] font-semibold mb-2"><Skeleton /></h1>
        <div className="flex justify-start items-center gap-4 mb-6">
          <Skeleton  width={200} />
          <Skeleton  width={200} />
        </div>
        <div className="border py-2 px-4 mb-4">
          <Skeleton width={200} height={200} />
        </div>

        <div className="flex justify-start items-center gap-4">
          <Skeleton width={100} />
          <Skeleton width={100} />
        </div>
    </>
  )
}

export default loading;