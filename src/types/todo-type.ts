import { ListResponse, Response } from './response-type';

export interface Todo {
  id: number;
  content: string;
  completed: boolean;
  userId: number;
}

export type TodoResponse = Response<Todo, "todo">;
export type TodosResponse = ListResponse<Todo, "todos">;
