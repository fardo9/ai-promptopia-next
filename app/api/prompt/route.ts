import { NextRequest, NextResponse } from 'next/server'
import Prompt from '@models/prompt'
import { connectToDB } from '@utils/database'
import { IPrompt } from '../interfaces'

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    try {
        await connectToDB()

        const prompts: IPrompt[] = await Prompt.find({}).populate('creator')

        return new NextResponse(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.error('Failed to fetch all prompts', error)
        return new NextResponse('Failed to fetch all prompts', { status: 500 })
    }
}