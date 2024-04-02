
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
const prisma = new PrismaClient()
export async function GET() {
    const get = await prisma.categories.findMany();
   if(get.length===0){
    return NextResponse.json({
        status: 404,
        message: "category not found",
    })
  
   }else{
    return NextResponse.json({
        status: 200,
        message: "Get All category Successfully",
        payload: get,
    })
   }
}
// Insert Category (POST)
export async function POST(req) {
    const  dataName  = await req.json();
    const insert = await prisma.categories.createMany({
        data:dataName,
    });
    return NextResponse.json(
        {
            status: 200,
            message: "Insert Category Successfully",
            payload: insert,
        }
    )

}


