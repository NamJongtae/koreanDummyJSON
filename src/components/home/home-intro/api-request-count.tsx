import useApiRequestCount from "@/src/hooks/home/useApiRequestCount";

export default function ApiRequestCount() {
  const { count, countLoading } = useApiRequestCount();

  function LoadingSkeleton() {
    return (
      <span className="inline-block h-5 w-10 bg-gray-300 rounded-md animate-pulse"></span>
    );
  }

  return (
    <div className="text-base sm:text-lg border-gray-200 w-fit bg-white border rounded-lg px-6 py-3">
      <p className="mb-1 text-gray-500">
        오늘의 API 요청 횟수 :{" "}
        <span className="font-medium  inline-flex items-center">
          {!count.todayCount || countLoading.todayCountLoading ? (
            <LoadingSkeleton />
          ) : (
            count.todayCount
          )}
          번
        </span>
      </p>
      <p className="text-gray-500">
        총 API 요청 횟수 :{" "}
        <span className="font-medium inline-flex items-center">
          {!count.totalCount || countLoading.totalCountLoading ? (
            <LoadingSkeleton />
          ) : (
            count.totalCount
          )}
          번
        </span>
      </p>
    </div>
  );
}
