import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0];
  console.log(clientIp);

  // if (process.env.TEST_MODE !== "1" && process.env.NODE_ENV !== "development") {
  //   try {
  //     await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/request-count`, {
  //       method: "POST"
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  if (req.nextUrl.pathname.startsWith("/api/")) {
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    response.headers.set("Cache-Control", "public, s-maxage=86400");

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
    "/api/image/:path*",
    "/api/lorem/:path*"
  ]
};
