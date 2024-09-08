import { NESTED_ENDPOINTS_DATA } from "@/src/table-data/nested-endpoints-data";
import ApiEndPointsTable from "../commons/api-endpoints-table";
import FetchSection from "../commons/fetch-section/fetch-section";

export default function NestedResources() {
  return (
    <FetchSection
      className="mb-20"
      id="하위-Resource-조회하기"
      title="하위 Resource 조회하기"
      descriptions={
        <p className="section-text mb-2">
          id가 1번인 게시물의 하위 resource 댓글 목록을 조회합니다.
        </p>
      }
      method="GET"
      fetchUrl="/posts/1/comments"
    >
      <p className="section-text mt-8 mb-4">
        이 외 아래와 같은 하위 Resource를 제공합니다.
      </p>

      <ApiEndPointsTable data={NESTED_ENDPOINTS_DATA} />
    </FetchSection>
  );
}
