import DeleteUser from "@/src/components/docs/users/delete-user";
import GetUser from "@/src/components/docs/users/get-user";
import GetUserComments from "@/src/components/docs/users/get-user-comments";
import GetUserPosts from "@/src/components/docs/users/get-user-posts";
import GetUserReviews from "@/src/components/docs/users/get-user-reviews";
import GetUserTodos from "@/src/components/docs/users/get-user-todos";
import GetUsers from "@/src/components/docs/users/get-users";
import GetUsersPaging from "@/src/components/docs/users/get-users-paging";
import PatchUser from "@/src/components/docs/users/patch-user";
import PostUser from "@/src/components/docs/users/post-user";
import PutUser from "@/src/components/docs/users/put-user";
import DocsTemplate from "@/src/components/docs/docs-template";

export default function UsersDocs() {
  return (
    <DocsTemplate
      SectionComponents={
        <>
          <GetUser />
          <GetUsers />
          <GetUsersPaging />
          <GetUserTodos />
          <GetUserPosts />
          <GetUserComments />
          <GetUserReviews />
          <PostUser />
          <PutUser />
          <PatchUser />
          <DeleteUser />
        </>
      }
      sectionIds={[
        "소개",
        "유저-조회하기",
        "유저-목록-조회하기",
        "유저-목록-페이징",
        "유저-할-일-목록-조회하기",
        "유저-게시물-목록-조회하기",
        "유저-댓글-목록-조회하기",
        "유저-리뷰-목록-조회하기",
        "유저-생성하기",
        "유저-데이터-전체-수정하기",
        "유저-데이터-일부-수정하기",
        "유저-삭제하기"
      ]}
    />
  );
}
