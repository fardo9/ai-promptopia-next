import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async (): Promise<void> => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('DB is already connected')
        return
    }

    try {
        if (!process.env.MONGODB_URI) {
            throw new Error(
                'MONGODB_URI is not defined in the environment variables'
            )
        }
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: 'share_prompt',
        })
        isConnected = true
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    }
}
