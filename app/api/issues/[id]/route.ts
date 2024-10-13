import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const GET = async (request: NextRequest, params: { id: string }) => {

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if(!issue){ 
        return NextResponse.json({
            status: false,
            message: "Issue not found"
        }, { status: 400 }); 
    }
    return NextResponse.json({ 
        status: true, 
        message: "Issue fetched successfully",
        data: issue
    });
}

export const DELETE = async (params: { id: string }) => {
    console.log("Id before: ", params.id);
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if(!issue){ 
        return NextResponse.json({
            status: false,
            message: "Issue not found"
        }, { status: 400 }); 
    }

    console.log("Id during delete: ", params.id);
    await prisma.issue.delete({
        where: { id: parseInt(params.id) }
    });

    return NextResponse.json({ 
        status: true, 
        message: "Issue deleted successfully"
    });
}

