import executeQuery from "@/src/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const date = searchParams.get("date");

    let count;

    if (date) {
      const result = (await executeQuery(
        "SELECT requestCount from request_counts where requestDate = ?",
        [date]
      )) as { requestCount: number }[] | null;

      count = result && result.length > 0 ? result[0].requestCount : 0;
    } else {
      const result = (await executeQuery(
        "SELECT SUM(requestCount) AS requestCount from request_counts",
        [date]
      )) as { requestCount: number }[] | null;
      count = result && result.length > 0 ? result[0].requestCount : 0;
    }

    return NextResponse.json(
      {
        message: "요청 횟수 조회 성공",
        count
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "오늘의 요청 횟수 조회 실패" },
      { status: 500 }
    );
  }
}

export async function POST() {
  const today = new Date();
  today.setHours(today.getHours() + 9); // UTC 시간을 KST로 변환
  const formattedToday = today.toISOString().split("T")[0];

  try {
    // 오늘 날짜의 요청 카운트 여부 확인
    const rows =
      ((await executeQuery(
        "SELECT * FROM request_counts WHERE requestDate = ?",
        [formattedToday]
      )) as { requestCount: number }[]) || null;

    if (rows.length > 0) {
      // 오늘 날짜가 존재하면 카운트 증가
      await executeQuery(
        "UPDATE request_counts SET requestCount = requestCount + 1 WHERE requestDate = ?",
        [formattedToday]
      );
    } else {
      // 오늘 날짜가 존재하지 않으면 추가

      await executeQuery(
        "INSERT INTO request_counts (requestDate, requestCount) VALUES (?, ?)",
        [formattedToday, 1]
      );
    }
    return NextResponse.json({ message: "API 요청 횟수 업데이트 성공" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "API 요청 횟수 업데이트 실패" });
  }
}
