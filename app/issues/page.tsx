import prisma from "@/prisma/client";
import Link from "next/link";
import Badge from "./Badge";
import Pagination from "./Pagination";
import Filtering from "./Filtering";
import { Issue, Status } from "@prisma/client";

interface Props {
  searchParams: { 
    status: Status; 
    orderBy: keyof Issue;
  }
}

const Issues = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  const columns: { label: string; value: keyof Issue }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status" },
    { label: "Created At", value: "createdAt" }
  ]

  const orders = columns.map(column => column.value);
  const orderBy = orders.includes(searchParams.orderBy) ? { [searchParams.orderBy]: "asc" } : undefined;
  
  const issues = await prisma.issue.findMany({ 
    where: { status },
    orderBy
  });


  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-8">
        <h1 className="text-2xl text-center">ISSUES</h1>
        <Link href="/issues/new" className="bg-blue-600 text-white py-2 px-4 rounded">Create Issue</Link>
      </div>

      <div className="mb-6">
        <Filtering />
      </div>

      <div className="overflow-x-auto text-sm pb-4">
        {
          issues.length ? (
            <div className="">
              <table className="w-full border border-collapse whitespace-nowrap mb-4">
                <thead>
                  <tr className="bg-gray-200">
                    {
                      columns.map(column => (
                        <th key={column.value} className="border py-2 px-4">
                          <Link href={{ query: {...searchParams, orderBy: column.value }}}>
                              {column.label}
                          </Link>
                        </th>
                      ))
                    }
                    <th className="border py-2 px-4"></th>
                  </tr>
                </thead>

                <tbody>
                  {
                    issues.map(issue => (
                      <tr key={issue.id}>
                        <td className="border py-2 px-4">{issue.title}</td>
                        <td className="border py-2 px-4"><Badge status={issue.status} /> </td>
                        <td className="border py-2 px-4">{new Date(issue.createdAt).toDateString()}</td>
                        <td className="border py-2 px-4"><Link href={`/issues/${issue.id}`} className="text-blue-500 hover:underline">View</Link></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

              <Pagination 
                pageSize={10}
                currentPage={1}
                itemCount={21}
              />
            </div>
          ) : (
            <p className="text-center text-red-600">No issues record</p>
          )
        }
      </div>
    </>
  )
}

export const dynamic = "force-dynamic";

export default Issues;