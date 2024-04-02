import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET(req, { params: { id } }) {
    const getCustomers = await prisma.customers.findUnique({
        where: {
            customer_id: parseInt(id),
        }
    });
    if (getCustomers === null) {
        return NextResponse.json({
            status: 404,
            message: "Get Customers byId: " + id + " Not Found",
        })
    } else {
        return NextResponse.json({
            status: 200,
            message: "Get Customers byId: " + id + " Successfully",
            data: getCustomers
        });
    }

}
//Update by id 
export async function PUT(request, { params: { id } }) {
    const { first_name, last_name, birth_date, money_spent } = await request.json();
    try{
        const updateCustomer = await prisma.customers.update({
            where: {
                customer_id: parseInt(id),
            },
            data: {
                first_name,
                last_name,
                birth_date,
                money_spent,
            },
        });
        return NextResponse.json({
            status: 200,
            message: "Update Customer Successfully",
            payload: updateCustomer,
        })
    }catch(error){
        return NextResponse.json({
            status: 404,
            message: "Update Customer byId: " + id + " Not Found",
        })
    }
}
// Delete customer 
export async function DELETE(request, { params: { id } }) {
    try {
        const deleteCustomer = await prisma.customers.delete({
            where: {
                customer_id: parseInt(id),
            }

        });
        return NextResponse.json({
            status: 200,
            message: "Deleted Customer " + id + " Successfully",
        })
    } catch (error) {
        return NextResponse.json({
            status: 404,
            message: "Delete Customer byId: " + id + " Not Found",
        })
    }
}