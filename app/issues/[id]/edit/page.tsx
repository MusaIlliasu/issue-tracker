import prisma from "@/prisma/client";
import IssueForm from "../../new/IssueForm";

const EditPage = async ({ params }: { params: { id: string }}) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  });

  if(!issue){ return <p className="text-center text-red-600 mt-6">No record found</p> }

  return (
    <IssueForm issue={issue} />
  )
}

export default EditPage;