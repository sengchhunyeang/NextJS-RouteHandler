import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");
const prisma=new PrismaClient();
// Get Order by id 
export async function GET(request,{params:{id}}){
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
// Update order by ID
export async function PUT(request,{params:{id}}){
    const updateOrder =await prisma.orders.update({
        where:{
           order_id:parseInt(id),
        },
        data: {
            customer_id,
            product_id,
            order_qty
        }
    });
    return NextResponse.json({
        status: 200,
        message: "Update Order Successfully",
        payload: updateOrder,
    });
}
//Delete order by id 
export async function DELETE(request,{params: {id}}){
    const deleteOrder =await prisma.orders.delete({
        where:{
            order_id:parseInt(id),
        }
    });
    return NextResponse.json({
        status: 200,
        message: "Delete OrderID "+id+" Successfully",
        
    });
}