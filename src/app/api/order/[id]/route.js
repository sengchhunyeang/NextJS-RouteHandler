import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");

const prisma=new PrismaClient();
export async function GET(request,{paras:{id}}){
    const getCategory=await prisma.orders.findUnique({
        where:{
            order_id:parseInt(id)
        }
    });
    return NextResponse.json({
        status:200,
        message:"Get products by Category Id "+id+" Successfully",
        payload: getCategory,
    })
    
}