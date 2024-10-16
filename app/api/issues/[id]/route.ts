import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { authenticated } from "../../utils";

export const PATCH = async (request: NextRequest, { params }: { params: { id: string  } }) => {
    const isAuthenticated = await authenticated();
    if(!isAuthenticated){
        return NextResponse.json({
            status: false,
            message: "Access denied"
        }, { status: 401 });
    }
    
    const body = await request.json();
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });
    if(!issue){ 
        return NextResponse.json({
            status: false,
            message: "Issue not found"
        }, { status: 400 }); 
    }

    const updatedIssue = await prisma.issue.update({
        where: { id: parseInt(params.id) },
        data: {
            title: body.title,
            description: body.description
        }
    });
    return NextResponse.json({ 
        status: true, 
        message: "Issue updated successfully",
        data: updatedIssue
    });
}

export const DELETE = async (request: NextRequest, { params }: { params: { id: string  } }) => {
    const isAuthenticated = await authenticated();
    if(!isAuthenticated){
        return NextResponse.json({
            status: false,
            message: "Access denied"
        }, { status: 401 });
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });
    if(!issue){ 
        return NextResponse.json({
            status: false,
            message: "Issue not found"
        }, { status: 400 }); 
    }

    await prisma.issue.delete({
        where: { id: parseInt(params.id) }
    });
    return NextResponse.json({ 
        status: true, 
        message: "Issue deleted successfully"
    });
}

