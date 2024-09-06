"use client";

import DeleteTodo from "@/src/components/docs/todos/delete-todo";
import FilterUserTodos from "@/src/components/docs/todos/filter-user-todos";
import GetTodo from "@/src/components/docs/todos/get-todo";
import GetTodos from "@/src/components/docs/todos/get-todos";
import GetTodosPaging from "@/src/components/docs/todos/get-todos-paging";
import PatchTodo from "@/src/components/docs/todos/patch-todo";
import PostTodo from "@/src/components/docs/todos/post-todo";
import PutTodo from "@/src/components/docs/todos/put-todo";
import DocsTemplate from "@/src/components/docs/docs-template";

export default function TodosDocs() {
  return (
    <DocsTemplate
      SectionComponents={
        <>
          <GetTodo />
          <GetTodos />
          <GetTodosPaging />
          <FilterUserTodos />
          <PostTodo />
          <PutTodo />
          <PatchTodo />
          <DeleteTodo />
        </>
      }
      sectionIds={[
        "소개",
        "할-일-조회하기",
        "할-일-목록-조회하기",
        "할-일-목록-페이징",
        "할-일-목록-필터링하기",
        "할-일-생성하기",
        "할-일-데이터-전체-수정하기",
        "할-일-데이터-일부-수정하기",
        "할-일-삭제하기"
      ]}
    />
  );
}
