import DeleteBook from "@/src/components/docs/books/delete-book";
import GetBook from "@/src/components/docs/books/get-book";
import GetBookReviews from "@/src/components/docs/books/get-book-reviews";
import GetBooks from "@/src/components/docs/books/get-books";
import GetBooksPaging from "@/src/components/docs/books/get-books-paging";
import PatchBook from "@/src/components/docs/books/patch-book";
import PostBook from "@/src/components/docs/books/post-book";
import PutBook from "@/src/components/docs/books/put-book";
import DocsTemplate from "@/src/components/docs/docs-template";

export default function BooksDocs() {
  return (
    <DocsTemplate
      SectionComponents={
        <>
          <GetBook />
          <GetBooks />
          <GetBooksPaging />
          <GetBookReviews />
          <PostBook />
          <PutBook />
          <PatchBook />
          <DeleteBook />
        </>
      }
      sectionIds={[
        "소개",
        "책-조회하기",
        "책-목록-조회하기",
        "책-목록-페이징",
        "책-리뷰-목록-조회하기",
        "책-생성하기",
        "책-데이터-전체-수정하기",
        "책-데이터-일부-수정하기",
        "책-삭제하기"
      ]}
    />
  );
}
