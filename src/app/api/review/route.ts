import { NextResponse } from "next/server"
import prisma from "@/lib/prismadb"

export async function POST(req: Request) {
    const { toyId, content, userFullName, rating } = await req.json()
    const review = await prisma.review.create({
        data: {
            toyId,
            content,
            userFullName,
            rating
        }
    })
    return NextResponse.json(review)
}