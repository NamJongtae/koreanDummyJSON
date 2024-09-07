import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  console.log(authHeader);
  if (!authHeader) {
    return NextResponse.json(
      { error: "토큰이 존재하지 않습니다." },
      { status: 401 }
    );
  }
  const accessToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(accessToken, "ACCESS_TOKEN") as JwtPayload;

    return NextResponse.json({
      message: "토큰 인증 성공",
      userId: decoded.id
    });
  } catch (error) {
    return NextResponse.json(
      { error: "유효한 토큰이 아닙니다." },
      { status: 401 }
    );
  }
}
