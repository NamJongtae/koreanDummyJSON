import DeleteComment from "@/src/components/docs/comments/delete-comment";
import FilterPostComments from "@/src/components/docs/comments/filter-post-comments";
import FilterUserComments from "@/src/components/docs/comments/filter-user-comments";
import GetComment from "@/src/components/docs/comments/get-comment";
import GetComments from "@/src/components/docs/comments/get-comments";
import GetCommentsPaging from "@/src/components/docs/comments/get-comments-paging";
import PatchComment from "@/src/components/docs/comments/patch-comment";
import PostComment from "@/src/components/docs/comments/post-comment";
import PutComment from "@/src/components/docs/comments/put-comment";
import DocsTemplate from "@/src/components/docs/docs-template";

export default function CommentsDocs() {
  return (
    <DocsTemplate
      SectionComponents={
        <>
          <GetComment />
          <GetComments />
          <GetCommentsPaging />
          <FilterUserComments />
          <FilterPostComments />
          <PostComment />
          <PutComment />
          <PatchComment />
          <DeleteComment />
        </>
      }
      sectionIds={[
        "소개",
        "댓글-조회하기",
        "댓글-목록-조회하기",
        "댓글-목록-페이징",
        "유저-댓글-목록-필터링하기",
        "게시물-댓글-목록-필터링하기",
        "댓글-생성하기",
        "댓글-데이터-전체-수정하기",
        "댓글-데이터-일부-수정하기",
        "댓글-삭제하기"
      ]}
    />
  );
}
