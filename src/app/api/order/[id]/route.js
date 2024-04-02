import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// Get Order by id 
export async function GET(request, { params: { id } }) {
    const getCategory = await prisma.orders.findUnique({
        where: {
            order_id: parseInt(id)
        }
    });
    if (getCategory === null) {
        return NextResponse.json({
            status: 404,
            message: "Get products by Category Id " + id + " Not Found",
        });
    } else {
        return NextResponse.json({
            status: 200,
            message: "Get products by Category Id " + id + " Successfully",
            payload: getCategory,
        });
    }
}
// Update order by ID
export async function PUT(req, { params: { id } }) {
    try {
        const { customer_id, product_id, order_qty } = await req.json();
        const productDB = await prisma.products.findUnique({
            where: {
                product_id
            }
        })
        const { price } = productDB;
        const order_total = price * order_qty;
        const updateOrder = await prisma.orders.update({
            where: {
                order_id: parseInt(id),
            },
            data: {
                customer_id: customer_id,
                product_id: product_id,
                order_qty: order_qty,
                order_total: order_total,

            }
        })

        return NextResponse.json({
            status: 200,
            message: "Update OrderID " + id + " Successfully",
            payload: updateOrder,
        });
    } catch (error) {
        return NextResponse.json({
            status: 400,
            message: "Update OrderID " + id + " Failed please Input id again",
            
        });
    }
}



//Delete order by id 
export async function DELETE(request, { params: { id } }) {
    try{
        const deleteOrder = await prisma.orders.delete({
            where: {
                order_id: parseInt(id),
            }
        });
        return NextResponse.json({
            status: 200,
            message: "Delete OrderID " + id + " Successfully",
    
        });
    }catch(error){
        return NextResponse.json({
            status: 400,
            message: "Delete OrderID " + id + " Failed please Input id again", 
        });
    }
}