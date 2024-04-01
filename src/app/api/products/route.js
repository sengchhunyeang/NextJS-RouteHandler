import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
const prisma = new PrismaClient()
export async function GET() {
    const get = await prisma.products.findMany();
    return NextResponse.json({
        status: 200,
        message: "Get All Products Successfully",
        payload: get,
    })
}

// // Create Products 
export async function POST(req) {
    const {category_id,product_name,price}=await req.json();
 const createProduct = await prisma.products.create({
     data:{
         category_id,
         product_name,
         price,
     },
 });
 return NextResponse.json({
     status:200,
     message:"Create Product Successfully",
     payload:createProduct,
 })
}