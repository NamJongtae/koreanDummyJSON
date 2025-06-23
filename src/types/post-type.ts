import { ListResponse, Response } from "./response-type";

export interface Post {
  id: number;
  title: string;
  content: string;
  imgUrl: string;
  createdAt: string;
  userId: number;
}

export type PostResponse = Response<Post, "post">;
export type PostsResponse = ListResponse<Post, "posts">;
