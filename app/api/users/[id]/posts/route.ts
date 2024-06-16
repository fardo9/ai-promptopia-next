import { NextRequest, NextResponse } from 'next/server'
import Prompt from '@models/prompt'
import { connectToDB } from '@utils/database'
import { IPrompt } from 'app/api/interfaces'

export const GET = async (request: NextRequest, { params}: {params: string}): Promise<NextResponse> => {
    try {
        await connectToDB()

        const prompts: IPrompt[] = await Prompt.find({
            creator: params?.id
        }).populate('creator')

        return new NextResponse(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.error('Failed to fetch all prompts', error)
        return new NextResponse('Failed to fetch all prompts', { status: 500 })
    }
}