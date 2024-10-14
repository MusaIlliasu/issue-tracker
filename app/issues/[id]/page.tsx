import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import Badge from "../Badge";
import Markdown from "react-markdown";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

const IssuePage = async ({ params }: { params: { id: string}}) => {
    if(!parseInt(params.id)){ notFound(); }
    
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });
    if(!issue){ return <p className="text-center text-red-600 py-4">Issue not found</p> }
    
  return (
    <div className="w-full md:w-[450px] mx-auto">
        <h1 className="font-semibold mb-2">{issue.title}</h1>
        <div className="flex justify-start items-center gap-4 mb-6">
          <Badge status={issue.status} />
          <span className="text-xs">{issue.createdAt.toDateString()}</span>
        </div>
        <div className="border py-2 px-4 mb-4 prose">
          <Markdown>{issue.description}</Markdown>
        </div>

        <div className="flex justify-start items-center gap-4">
          <Link href={`/issues/${issue.id}/edit`} className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors">Edit</Link>
          <DeleteButton id={issue.id} />
        </div>
    </div>
  )
}

export default IssuePage;