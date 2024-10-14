import prisma from "@/prisma/client";
import IssueForm from "../../new/IssueForm";
import { notFound } from "next/navigation";

const EditPage = async ({ params }: { params: { id: string }}) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  });

  if(!issue){ notFound(); }

  return (
    <IssueForm issue={issue} />
  )
}

export default EditPage;