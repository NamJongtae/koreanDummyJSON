import { ListResponse, Response } from "./response-type";

export interface Review {
  id: number;
  rating: number;
  content: string;
  createdAt: string;
  userId: number;
  bookId: number;
}

export type ReviewResponse = Response<Review, "review">;
export type ReviewsResponse = ListResponse<Review, "reviews">;
