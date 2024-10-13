import prisma from "@/prisma/client";
import Link from "next/link";
import Badge from "./Badge";

const Issues = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl text-center">ISSUES</h1>
        <Link href="/issues/new" className="bg-blue-600 text-white py-2 px-4 rounded">Create Issue</Link>
      </div>

      <div className="overflow-x-auto text-sm pb-4">
        <table className="w-full border border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-gray-200">
              <th className="border py-2 px-4">S/N</th>
              <th className="border py-2 px-4">Issue</th>
              <th className="border py-2 px-4">Status</th>
              <th className="border py-2 px-4">Created At</th>
              <th className="border py-2 px-4"></th>
            </tr>
          </thead>

          <tbody>
            {
              issues.map((issue, index) => (
                <tr key={issue.id}>
                  <td className="border py-2 px-4">{index + 1}</td>
                  <td className="border py-2 px-4">{issue.title}</td>
                  <td className="border py-2 px-4"><Badge status={issue.status} /> </td>
                  <td className="border py-2 px-4">{new Date(issue.createdAt).toDateString()}</td>
                  <td className="border py-2 px-4"><Link href={`/issues/${issue.id}`} className="text-blue-500 hover:underline">View</Link></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Issues;