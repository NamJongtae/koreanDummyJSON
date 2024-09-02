import { BookResponse, BooksResponse } from "./book-type";
import { CommentResponse, CommentsResponse } from "./comment-type";
import { PostResponse, PostsResponse } from "./post-type";
import { ReviewResponse, ReviewsResponse } from "./review-type";
import { TodoResponse, TodosResponse } from "./todo-type";
import { UserResponse, UsersResponse } from "./user-type";

// Response 타입 정의
export type Response<T, K extends string> = {
  message: string;
} & {
  [key in K]: T;
};

// ListResponse 타입 정의
export type ListResponse<T, K extends string> = {
  message: string;
  page?: number;
  limit?: number;
  hasNextPage?: number;
} & {
  [key in K]: T[];
};

export type DummyDataResonses =
  | UserResponse
  | UsersResponse
  | TodoResponse
  | TodosResponse
  | PostResponse
  | PostsResponse
  | CommentResponse
  | CommentsResponse
  | BookResponse
  | BooksResponse
  | ReviewResponse
  | ReviewsResponse
  | null;
