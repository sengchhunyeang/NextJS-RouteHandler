import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET() {
    const getCustomers = await prisma.orders.findMany();
    return NextResponse.json({
        status: 200,
        message: "Get All Customers Successfully",
        payload: getCustomers,
    })
}
// Post data Order
export async function POST(req) {
    const { product_id, customer_id, order_qty } = await req.json();
    const productDB = await prisma.products.findUnique({
        where: {
            product_id
        }
    })
    const { price } = productDB;
    const order_total = price * order_qty;
    const postOrder = await prisma.orders.create({
        data: {
            product_id,
            customer_id,
            order_qty,
            order_total: order_total,
        }
    });
    return NextResponse.json({
        status: 200,
        message: "Post Order Successfully",
        payload: postOrder,
    })
}