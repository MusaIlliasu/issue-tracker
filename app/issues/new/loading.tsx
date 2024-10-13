import Skeleton from "react-loading-skeleton";

const loading = () => {

  return (
    <div className="w-full md:w-[500px] border rounded mx-auto p-4 md:p-8">
        <h2 className="text-center mb-5">Create New Bug</h2>
        <div className="mb-5">
            <Skeleton />
        </div>

        <div className="mb-5">
            <Skeleton width="100%" height={200} />
        </div>

        <div>
            <Skeleton />
        </div>
    </div>
  )
}

export default loading;