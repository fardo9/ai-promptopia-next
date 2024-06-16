import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'
import { IPromptRequest, IPrompt } from 'app/api/interfaces'

export const POST = async (request: {
    json: () => Promise<IPromptRequest>
}): Promise<Response> => {
    const { userId, prompt, tag } = await request.json()

    try {
        await connectToDB()
        const newPromptData: IPrompt = { creator: userId, prompt, tag }
        const newPrompt = new Prompt(newPromptData)

        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response('Failed to create a new prompt', { status: 500 })
    }
}
