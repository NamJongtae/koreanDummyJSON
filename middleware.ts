import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0];
  console.log(clientIp);

  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/request-count`, {
      method: "POST"
    });
  } catch (error) {
    console.error(error);
  }

  if (req.nextUrl.pathname.startsWith("/api/")) {
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return response;
  }
  return NextResponse.next();
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
