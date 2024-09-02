import { ListResponse, Response } from "./response-type";

export interface User {
  id: number;
  username: string;
  phone: string;
  address: string;
  email: string;
  createdAt: string;
}

export type UserResponse = Response<User, "user">;
export type UsersResponse = ListResponse<User, "users">;
