export interface IUser {
    _id: string;
    username: string;
    email: string;
    image: string;
  }

export interface IPost {
    _id: string;
    prompt: string;
    tag: string;
    creator: IUser;
  }