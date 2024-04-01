import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
const prisma = new PrismaClient()
export async function GET(){
    const getCustomers=await prisma.customers.findMany();
    return NextResponse.json({
        status:200,
        message:"Get All Customers Successfully",
        payload:getCustomers,
    })
}
export async function POST(req) {
    const { first_name, last_name, birth_date, money_spent } = await req.json();
    const dataCustomers = await prisma.customers.create({
        data: {
            first_name,
            last_name,
            birth_date,
            money_spent,
        }
    });

    return NextResponse.json({
        status: 200,
        message: "A new customer created  successfully",
        payload: dataCustomers,
    })
}