import ApiEndPointsTable from "../commons/api-endpoints-table";
import FetchSection from "../commons/fetch-section/fetch-section";
import { DELETE_ENDPOINT_DATA } from "@/src/table-data/api-endpoints-data";

export default function DeleteResource() {
  return (
    <FetchSection
      id="Resource-삭제하기"
      title="Resource 삭제하기"
      descriptions={
        <p className="section-text mb-4">id가 1인 게시물 삭제합니다.</p>
      }
      method="DELETE"
      fetchUrl="/posts/1"
    >
      <p className="section-text mt-8 mb-4">
        이 외 아래와 같은 Resource를 제공합니다.
      </p>

      <ApiEndPointsTable data={DELETE_ENDPOINT_DATA} />
    </FetchSection>
  );
}
