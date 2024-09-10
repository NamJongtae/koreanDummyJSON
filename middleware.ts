import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const clientIp = req.ip || req.headers.get('x-forwarded-for')?.split(',')[0];
  console.log(clientIp);

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
    "/api/users/:path*",
    "/api/todos/:path*",
    "/api/posts/:path*",
    "/api/comments/:path*",
    "/api/books/:path*",
    "/api/reviews/:path*",
    "/api/auth/:path*",
    "/api/image/:path*"
  ]
};
