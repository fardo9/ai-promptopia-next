import { IPost } from "@interfaces/index";


  
  export interface IFeedCardProps {
    key?: string
    post: IPost;
    handleEdit?: () => void;
    handleDelete?: () => void;
    handleTagClick?: (tag: string) => void;
  }
export interface IFeedListProps {
    data: IPost[];
    handleTagClick: (tag: string) => void;
  }