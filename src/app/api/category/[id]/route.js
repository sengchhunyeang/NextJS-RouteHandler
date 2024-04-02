import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
const prisma = new PrismaClient()
// update by id 
export async function PUT(req, { params: { id } }) {
  try{
    const { category_name } = await req.json();
    const put = await prisma.categories.update({
        where: {
            category_id: parseInt(id),
        },
        data: {
            category_name: category_name,
        }
    });
    if (put.category_id === undefined) {
        return NextResponse.json({
            status: 404,
            message: "Update : " + id + " Not Found",
        });


    } else {
        return NextResponse.json({
            status: 200,
            message: "Update Category Successfully",
            payload: put,
        });
    }
  }catch(error){
    return NextResponse.json({
        status: 500,
        message: "Internal Server Error",
        payload: error,
    })
  }
}
    // get by id 
    export async function GET(request, { params: { id } }) {
        if (isNaN(id)) {

            const getName = await prisma.categories.findUnique({
                where: {
                    category_name: id,
                }
            });
            if (getName === null) {
                return NextResponse.json({
                    status: 404,
                    message: "Category get name: " + id + " Not Found",

                })
            } else {
                return NextResponse.json({
                    status: 200,
                    message: "Get CategoryBy Name:" + id + " Successfully",
                    payload: getName,
                })

            }

        }
        else {
            const getbyId = await prisma.categories.findUnique({
                where: {
                    category_id: parseInt(id),
                }
            });
            if (getbyId === null) {
                return NextResponse.json({
                    status: 404,
                    message: "Category get id: " + id + " Not Found",

                })
            } else {
                return NextResponse.json({
                    status: 200,
                    message: "Get Category id: " + id + " Successfully",
                    payload: getbyId,
                })
            }

        }
    }