import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
const prisma = new PrismaClient()
export async function GET(request, { params: { id } }) {
    if (isNaN(id)) {
        const put = await prisma.products.findUnique({
            where: {
                product_name: id,
            }
        });
        return NextResponse.json({
            status: 200,
            message: "Get All Products Successfully",
            payload: put,

        })
    } else {
        const put = await prisma.products.findMany({
            where: {
                product_id: parseInt(id)
            }
        });
        return NextResponse.json({
            status: 200,
            message: "Get All Products Successfully",
            payload: put,
        })
}
}
// Update Products
export async function PUT(request,{params:{id}}){
    const {category_id,product_name,price}=await request.json();
    const updateProduct=await prisma.products.update({
        where:{
            product_id:parseInt(id)
        },
        data:{
            category_id,
            product_name,
            price,
        },
    });
    return NextResponse.json({
        status:200,
        message:"Update Product Successfully",
        payload:updateProduct,
    })
}

// Delete Product by id 
export async function DELETE(request,{params:{id}}){
    const deleteProduct =await prisma.products.delete({
        where:{
            product_id:parseInt(id),
        },

    });
    return NextResponse.json({
        status:200,
        message:"Deleted Product Successfully",
    })
}