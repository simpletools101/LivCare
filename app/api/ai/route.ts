import { NextResponse } from 'next/server'
import { requestFromAI } from '@/lib/model/openAI' // Adjust the import path accordingly

export async function POST(req: Request) {
    try {
        const { userRequestContent } = await req.json()
        const response = await requestFromAI(userRequestContent)
        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
    }
}
