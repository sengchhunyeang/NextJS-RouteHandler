import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
const prisma = new PrismaClient()
export async function GET(request, { params: { id } }) {
    const getCategory = await prisma.products.findMany({
        where: {
            category_id: parseInt(id)
        }
    });
    if (getCategory.length === 0) {
        return NextResponse.json({
            status: 404,
            message: "No product found with this id",
        })
    } else {
        return NextResponse.json({
            status: 200,
            message: "Get products by Category Id " + id + " Successfully",
            payload: getCategory,
        })
    }


}