import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
const prisma = new PrismaClient()


// update by id 
export async function PUT(req, { params: { id } }) {
    const { category_name } = await req.json();
    const put = await prisma.categories.update({
        where: {
            category_id: parseInt(id),
        },
        data: {
            category_name: category_name,
        }
    });
    return NextResponse.json({
        status: 200,
        message: "Update Category Successfully",
        payload: put,
    });
}
// get by id 
export async function GET(request, { params: { id } }) {
    if (isNaN(id)) {

        const getName = await prisma.categories.findUnique({
            where: {
                category_name: id,
            }
        });
        return NextResponse.json({
            status: 200,
            message: "Get Category Successfully",
            payload: getName,
        })

    }
    else {
        const getbyId = await prisma.categories.findUnique({
            where: {
                category_id: parseInt(id),
            }
        });
        return NextResponse.json({
            status: 200,
            message: "Get Category Successfully",
            payload: getbyId,
        })
    }

}