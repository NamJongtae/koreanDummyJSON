import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { id, password, ATExp, RTExp } = await req.json();

  if (!id || !id.trim()) {
    return NextResponse.json(
      { message: "id를 입력해주세요." },
      { status: 422 }
    );
  }

  if (!password || !password.trim()) {
    return NextResponse.json(
      { message: "password를 입력해주세요." },
      { status: 422 }
    );
  }

  const accessToken = jwt.sign({ id }, "ACCESS_TOKEN", {
    expiresIn: ATExp || 60 * 60
  });

  const refreshToken = jwt.sign({ id }, "REFRESH_TOKEN", {
    expiresIn: RTExp || 60 * 60 * 24
  });

  return NextResponse.json({
    message: "로그인 성공",
    accessToken,
    refreshToken
  });
}
