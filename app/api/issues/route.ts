import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { authenticated } from "../utils";

export const GET = async () => {
    
    const issues = await prisma.issue.findMany();
    return NextResponse.json({
        status: true,
        message: "Issues fetched successfully",
        data: issues
    });
}

export const POST = async (request: NextRequest) => {
    const isAuthenticated = await authenticated();
    if(!isAuthenticated){
        return NextResponse.json({
            status: false,
            message: "Access denied"
        }, { status: 401 });
    }

    const body = await request.json();
    const errors = [];
    if(!body.title || !body.title.length){ errors.push("Title field is required"); }
    if(!body.description || !body.description.length){ errors.push("Description field is required"); }
    
    if(errors.length){ return NextResponse.json({ status: false, errors }, { status: 400 }); }

    const createdIssue = await prisma.issue.create({ 
        data: { title: body.title, description: body.description } 
    });
    return NextResponse.json({
        status: true,
        message: "Issue created successfully",
        data: createdIssue
    }, { status: 201 });
}
