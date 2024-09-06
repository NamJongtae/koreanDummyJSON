import DeleteReview from "@/src/components/docs/reviews/delete-review";
import GetReview from "@/src/components/docs/reviews/get-review";
import FilterReviewsBook from "@/src/components/docs/reviews/filter-reviews-book";
import FilterReviewsUser from "@/src/components/docs/reviews/filter-reviews-user";
import GetReviews from "@/src/components/docs/reviews/get-reviews";
import GetReviewsPaging from "@/src/components/docs/reviews/get-reviews-paging";
import PatchReview from "@/src/components/docs/reviews/patch-review";
import PostReview from "@/src/components/docs/reviews/post-review";
import PutReview from "@/src/components/docs/reviews/put-comment";
import DocsTemplate from "@/src/components/docs/docs-template";

export default function ReviewsDocs() {
  return (
    <DocsTemplate
      SectionComponents={
        <>
          <GetReview />
          <GetReviews />
          <GetReviewsPaging />
          <FilterReviewsUser />
          <FilterReviewsBook />
          <PostReview />
          <PutReview />
          <PatchReview />
          <DeleteReview />
        </>
      }
      sectionIds={[
        "소개",
        "리뷰-조회하기",
        "리뷰-목록-조회하기",
        "리뷰-목록-페이징",
        "유저-리뷰-목록-필터링하기",
        "책-리뷰-목록-필터링하기",
        "리뷰-생성하기",
        "리뷰-데이터-전체-수정하기",
        "리뷰-데이터-일부-수정하기",
        "리뷰-삭제하기"
      ]}
    />
  );
}
