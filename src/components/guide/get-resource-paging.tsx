import { PAGEING_ENDPOINTS_DATA } from "@/src/table-data/paging-endpoints-data";
import ApiEndPointsTable from "../commons/api-endpoints-table";
import FetchSection from "../commons/fetch-section/fetch-section";

export default function GetResourcesPaging() {
  return (
    <FetchSection
      id="Resource-목록-페이징"
      title="Resource 목록 페이징"
      descriptions={
        <>
          <p className="section-text mb-2">
            게시물 목록을 페이징 처리하여 조회합니다.
          </p>
          <p className="section-text mb-4">
            Fetch URL Query String을 통해 page와 limit를 설정할 수 있습니다.
          </p>
        </>
      }
      method="GET"
      fetchUrl="/posts?page=1&limit=10"
    >
      <p className="section-text mt-8 mb-4">
        이 외 아래와 같은 페이징 Resource를 제공합니다.
      </p>

      <ApiEndPointsTable data={PAGEING_ENDPOINTS_DATA} />
    </FetchSection>
  );
}
