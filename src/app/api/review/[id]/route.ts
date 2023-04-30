import { NextResponse } from "next/server"
import prisma from "@/lib/prismadb"

export async function GET(req: Request, { params }) {
    try {
        const toyReviews = await prisma.review.findMany({
            where: {
                toyId: params.id
            }
        })
        return NextResponse.json(toyReviews)
    } catch (error) {
        return NextResponse.json({error: "No Reviews"})
    }
}