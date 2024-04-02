import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
const prisma = new PrismaClient()
export async function GET(request, { params: { id } }) {
    if (isNaN(id)) {
        const get = await prisma.products.findUnique({
            where: {
                product_name: id,
            }
        });
        if (get === null) {
            return NextResponse.json({
                status: 404,
                message: "Product Name " + id + " Not Found",
            })
        } else {
            return NextResponse.json({
                status: 200,
                message: "Get All Products Successfully",
                payload: get,

            })
        }
    } else {
        const get = await prisma.products.findMany({
            where: {
                product_id: parseInt(id)
            }
        });
        if (get.length===0) {
            return NextResponse.json({
                status: 404,
                message: "Product id " + id + " Not Found",
            })
        } else {
            return NextResponse.json({
                status: 200,
                message: "Get All Products Successfully",
                payload: get,
            })
        }
    }
}
// Update Products
export async function PUT(request, { params: { id } }) {
   try{
    const { category_id, product_name, price } = await request.json();
    const updateProduct = await prisma.products.update({
        where: {
            product_id: parseInt(id)
        },
        data: {
            category_id,
            product_name,
            price,
        },
    });
    return NextResponse.json({
        status: 200,
        message: "Update Product Successfully",
        payload: updateProduct,
    })
   }catch(error){
    return NextResponse.json({
        status: 400,
        message: "Update id "+id+" Product  failed",
    })
   }
}

// Delete Product by id 
export async function DELETE(request, { params: { id } }) {
    try{
        const deleteProduct = await prisma.products.delete({
            where: {
                product_id: parseInt(id),
            },
        });
        return NextResponse.json({
            status: 200,
            message: "Deleted Product Successfully",
            
        })
    }catch(err){
        return NextResponse.json({
            status: 400,
            message: "Deleted id "+id+" Product  failed",
        })
    }
}
