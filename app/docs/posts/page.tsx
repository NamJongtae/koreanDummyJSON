import DeletePost from "@/src/components/docs/posts/delete-post";
import FilterUserPosts from "@/src/components/docs/posts/filter-user-posts";
import GetPost from "@/src/components/docs/posts/get-post";
import GetPostComments from "@/src/components/docs/posts/get-post-comments";
import GetPosts from "@/src/components/docs/posts/get-posts";
import GetPostsPaging from "@/src/components/docs/posts/get-posts-paging";
import PatchPost from "@/src/components/docs/posts/patch-post";
import PostPost from "@/src/components/docs/posts/post-post";
import PutPost from "@/src/components/docs/posts/put-post";
import DocsTemplate from "@/src/components/docs/docs-template";

export default function PostsDocs() {
  return (
    <DocsTemplate
      SectionComponents={
        <>
          <GetPost />
          <GetPosts />
          <GetPostsPaging />
          <GetPostComments />
          <FilterUserPosts />
          <PostPost />
          <PutPost />
          <PatchPost />
          <DeletePost />
        </>
      }
      sectionIds={[
        "소개",
        "게시물-조회하기",
        "게시물-목록-조회하기",
        "게시물-목록-페이징",
        "게시물-댓글-목록-조회하기",
        "유저-게시물-목록-필터링하기",
        "게시물-생성하기",
        "게시물-데이터-전체-수정하기",
        "게시물-데이터-일부-수정하기",
        "게시물-삭제하기"
      ]}
    />
  );
}
