import Link from "next/link";
import FetchSection from "../commons/fetch-section/fetch-section";
import ApiEndPointsTable from "../commons/api-endpoints-table";
import { POST_ENDPOINT_DATA } from "@/src/table-data/api-endpoints-data";

export default function PostResource() {
  return (
    <FetchSection
      id="Resource-생성하기"
      title="Resource 생성하기"
      descriptions={
        <p className="section-text mb-4">새로운 게시물을 생성합니다.</p>
      }
      method="POST"
      body={{
        title: "테스트 글",
        content: "테스트 글 입니다.",
        imgUrl: "https://picsum.photos/id/1/300/300"
      }}
      fetchUrl="/posts"
    >
      <p className="section-text mt-8 mb-4">
        이 외 아래와 같은 Resource를 제공합니다. Resource body값은 각 Resource별{" "}
        <Link
          className="text-blue-600 betterhover:hover:underline underline-offset-4"
          href={"/docs/users"}
        >
          Docs
        </Link>
        를 참고해주세요.
      </p>
      <ApiEndPointsTable data={POST_ENDPOINT_DATA} />
    </FetchSection>
  );
}
