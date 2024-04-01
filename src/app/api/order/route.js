import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma=new PrismaClient();
export async function GET(){
    const getCustomers=await prisma.orders.findMany();
    return NextResponse.json({
        status:200,
        message:"Get All Customers Successfully",
        payload:getCustomers,
    })
}
// Post data Order
export async function POST(req){
    const {product_id,customer_id,order_qty}=await req.json();
    const postOrder=await prisma.orders.create({
        data:{
            product_id,
            customer_id,
            order_qty,
        }
    });
    return NextResponse.json({
        status:200,
        message:"Post Order Successfully",
        payload:postOrder,
    })
}