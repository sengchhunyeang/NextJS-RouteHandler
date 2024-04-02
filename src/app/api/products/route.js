import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
const prisma = new PrismaClient()
export async function GET() {
    try {
        const get = await prisma.products.findMany();
        return NextResponse.json({
            status: 200,
            message: "Get All Products Successfully",
            payload: get,
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
            payload: error,
        })
    }
}
// // Create Products 
export async function POST(req) {
    try {
        const { category_id, product_name, price } = await req.json();
        const createProduct = await prisma.products.create({
            data: {
                category_id,
                product_name,
                price,
            },
        });
        return NextResponse.json({
            status: 200,
            message: "Create Product Successfully",
            payload: createProduct,
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
            payload: error,
        })
    }
}