import Link from "next/link";
import FetchSection from "../commons/fetch-section/fetch-section";
import ApiEndPointsTable from "../commons/api-endpoints-table";
import { PATCH_ENDPOINT_DATA } from "@/src/table-data/api-endpoints-data";

export default function PatchResource() {
  return (
    <FetchSection
      id="Resource-일부-수정하기"
      title="Resource 일부 수정하기"
      descriptions={
        <p className="section-text mb-4">
          id가 1인 게시물을 일부를 수정합니다.
        </p>
      }
      method="PATCH"
      body={{ title: "테스트 글" }}
      fetchUrl="/posts/1"
    >
      <p className="section-text mt-8 mb-4">
        이 외 아래와 같은 Resources를 제공합니다. Resource body값은 각 Resource별{" "}
        <Link
          className="text-blue-600 betterhover:hover:underline underline-offset-4"
          href={"/docs/users"}
        >
          Docs
        </Link>
        를 참고해주세요.
      </p>
      <ApiEndPointsTable
        data={PATCH_ENDPOINT_DATA}
      />
    </FetchSection>
  );
}
