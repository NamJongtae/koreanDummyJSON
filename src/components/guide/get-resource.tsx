import ApiEndPointsTable from "../commons/api-endpoints-table";
import FetchSection from "../commons/fetch-section/fetch-section";
import { ID_ENDPOINT_DATA } from "@/src/table-data/api-endpoints-data";

export default function GetResource() {
  return (
    <FetchSection
      id="Resource-조회하기"
      title="Resource 조회하기"
      descriptions={
        <p className="section-text mb-4">id가 1인 게시물을 조회합니다.</p>
      }
      method="GET"
      fetchUrl="/posts/1"
    >
      <p className="section-text mt-8 mb-4">
        이 외 아래와 같은 Resources를 제공합니다.
      </p>

      <ApiEndPointsTable data={ID_ENDPOINT_DATA} />
    </FetchSection>
  );
}
