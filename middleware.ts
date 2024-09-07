import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/request-count`, {
      method: "POST"
    });
  } catch (error) {
    console.error(error);
  }
}

export const config = {
  matcher: [
    "/api/users",
    "/api/users/:path*",
    "/api/todos",
    "/api/todos/:path*",
    "/api/posts",
    "/api/posts/:path*",
    "/api/comments",
    "/api/comments/:path*",
    "/api/books",
    "/api/books/:path*",
    "/api/reviews",
    "/api/reviews/:path*"
  ]
};
