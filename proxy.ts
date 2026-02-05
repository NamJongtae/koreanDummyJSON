import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0];
  console.log(clientIp);
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/api/")) {
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

    // GET 요청 CDN 캐시 적용
    // 인증 API(/api/auth)는 Authorization 헤더에 따라 응답이 달라지므로 제외
    // 로렘 API(/api/lorem)은 매번 랜덤한 응답이 주어지므로 제외
    if (
      req.method === "GET" &&
      !pathname.startsWith("/api/auth") &&
      !pathname.startsWith("/api/lorem")
    ) {
      response.headers.set(
        "Cache-Control",
        "public, s-maxage=31536000, immutable"
      );
    }

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
