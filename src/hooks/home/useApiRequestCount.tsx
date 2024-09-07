import { useEffect, useState } from "react";

export default function useApiRequestCount() {
  const [count, setCount] = useState({ todayCount: 0, totalCount: 0 });
  const [countLoading, setCountLoading] = useState({
    todayCountLoading: false,
    totalCountLoading: false
  });
  const today = new Date();
  today.setHours(today.getHours() + 9); // UTC 시간을 KST로 변환
  const formattedToday = today.toISOString().split("T")[0];

  useEffect(function fetchTodayCount() {
    setCountLoading((prev) => ({ ...prev, todayCountLoading: true }));
    fetch(`/api/request-count?date=${formattedToday}`).then(async (res) => {
      const json = await res.json();
      setCount((prev) => ({ ...prev, todayCount: json.count }));
      setCountLoading((prev) => ({ ...prev, todayCountLoading: false }));
    });
  }, []);

  useEffect(function fetchTotalCount() {
    setCountLoading((prev) => ({ ...prev, totalCountLoading: true }));
    fetch("/api/request-count").then(async (res) => {
      const json = await res.json();
      setCount((prev) => ({ ...prev, totalCount: json.count }));
      setCountLoading((prev) => ({ ...prev, totalCountLoading: false }));
    });
  }, []);

  return { count, countLoading };
}
