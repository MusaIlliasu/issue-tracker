import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const loading = () => {
    const issues = [1, 2, 3, 4, 5];

  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-6">
        <Skeleton />
        <Skeleton />
      </div>

      <div className="overflow-x-auto text-sm pb-4">
        <table className="w-full border border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-gray-200">
              <th className="border py-2 px-4">S/N</th>
              <th className="border py-2 px-4">Issue</th>
              <th className="border py-2 px-4">Status</th>
              <th className="border py-2 px-4">Created At</th>
            </tr>
          </thead>

          <tbody>
            {
              issues.map(issue => (
                <tr key={issue}>
                  <td className="border py-2 px-4"><Skeleton /></td>
                  <td className="border py-2 px-4"> <Skeleton /> </td>
                  <td className="border py-2 px-4"> <Skeleton /> </td>
                  <td className="border py-2 px-4"> <Skeleton /> </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default loading;