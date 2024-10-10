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

