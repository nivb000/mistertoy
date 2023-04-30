import { NextResponse } from "next/server"
import { prisma } from "@/lib/prismadb"

export async function GET() {
    const toys = await prisma.toy.findMany()
    return NextResponse.json(toys)
}
export async function PUT(req: Request) {
    const { id, name, price, labels, createdAt, inStock } = await req.json()

    const updatedToy = await prisma.toy.update({
        where: {
            id
        },
        data: {
            name,
            price,
            labels,
            createdAt,
            inStock
        }
    })
    return NextResponse.json(updatedToy)
}
export async function POST(req: Request) {
    const { name, price, labels, createdAt, inStock } = await req.json()
    const toy = await prisma.toy.create({
        data: {
            name,
            price,
            labels,
            createdAt,
            inStock
        }
    })
    return NextResponse.json(toy)
}