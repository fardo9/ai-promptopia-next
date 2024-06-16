import { IPost } from "@interfaces/index";

export interface IProfileProps {
    name: string;
    desc: string;
    data: IPost[];
    handleEdit: (post: IPost) => void;
    handleDelete: (post: IPost) => void;
  }