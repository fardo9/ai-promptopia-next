import { Document, Model, model, models, Schema } from 'mongoose'

interface IUser extends Document {
    email: string
    username: string
    image: string
    // id?: string
}

const UserSchema = new Schema<IUser>({
    // id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     autopopulate: true,
    //     required: true,
    // },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        // match: [
        //     /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        //     'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
        // ],
    },
    image: {
        type: String,
    },
})

const User: Model<IUser> = models.User || model<IUser>('User', UserSchema)

export default User
