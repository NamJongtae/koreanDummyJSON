import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json(
      { error: "토큰이 존재하지 않습니다." },
      { status: 401 }
    );
  }

  const refreshToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(refreshToken, "REFRESH_TOKEN") as JwtPayload;

    const newAccessToken = jwt.sign({ id: decoded.id }, "ACCESS_TOKEN", {
      expiresIn: decoded.exp || 30 * 60
    });

    return NextResponse.json({
      message: "accessToken 재발급 성공",
      accessToken: newAccessToken
    });
  } catch (error) {
    return NextResponse.json(
      { error: "유효한 토큰이 아닙니다." },
      { status: 401 }
    );
  }
}
