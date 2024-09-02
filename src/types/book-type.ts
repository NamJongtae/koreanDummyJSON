import { ListResponse, Response } from "./response-type";

export interface Book {
  id: number;
  author: string;
  genre: string;
  title: string;
  publicationDate: string;
  totalPage: number;
}

export type BookResponse = Response<Book, "book">;
export type BooksResponse = ListResponse<Book, "books">;