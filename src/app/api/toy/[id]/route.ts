import { NextResponse } from "next/server"
import prisma from "@/lib/prismadb"

export async function GET(req: Request, { params }: any) {
    const toy = await prisma.toy.findUnique({
        where: {
            id: params.id
        }
    })
    return NextResponse.json(toy)
}


export async function DELETE(req: Request, {params}: any) {
    await prisma.toy.delete({
        where: { id: params.id }
    })
    return NextResponse.json('Delete Success')
}