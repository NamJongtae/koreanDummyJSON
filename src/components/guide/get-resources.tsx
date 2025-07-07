import ApiEndPointsTable from "../commons/api-endpoints-table";
import FetchSection from "../commons/fetch-section/fetch-section";
import { LIST_ENDPOINT_DATA } from "@/src/table-data/api-endpoints-data";

export default function GetResources() {
  return (
    <FetchSection
      id="Resource-목록-조회하기"
      title="Resource 목록 조회하기"
      descriptions={
        <p className="section-text mb-4">모든 게시물을 조회합니다.</p>
      }
      method="GET"
      fetchUrl="/posts"
    >
      <p className="section-text mt-8 mb-4">
        이 외 아래와 같은 Resources를 제공합니다.
      </p>

      <ApiEndPointsTable data={LIST_ENDPOINT_DATA} />
    </FetchSection>
  );
}
