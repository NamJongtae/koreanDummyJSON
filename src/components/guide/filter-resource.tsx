import ApiEndPointsTable from "../commons/api-endpoints-table";
import FetchSection from "../commons/fetch-section/fetch-section";
import { FILTER_ENDPOINT_DATA } from "@/src/table-data/api-endpoints-data";

export default function FilterResources() {
  return (
    <FetchSection
      id="Resource-필터링하기"
      title="Resource 필터링하기"
      descriptions={
        <p className="section-text mb-2">
          userId가 1번인 유저가 작성한 게시물 목록을 필터링합니다.
        </p>
      }
      method="GET"
      fetchUrl="/posts/?userId=1"
    >
      <p className="section-text mt-8 mb-4">
        이 외 아래와 같은 필터링 Resources를 제공합니다.
      </p>
      <ApiEndPointsTable data={FILTER_ENDPOINT_DATA} />
    </FetchSection>
  );
}
