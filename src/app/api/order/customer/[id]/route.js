import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
const prisma = new PrismaClient()
// Get order by Custumer id
export async function GET(request, { params: { id } }) {
    const getCustomer = await prisma.orders.findMany({
        where: {
            customer_id:parseInt(id),
        }
    });
    return NextResponse.json({
        status: 200,
        message: "Get Customer byId: " + id + " Successfully",
        data: getCustomer
    });
}
