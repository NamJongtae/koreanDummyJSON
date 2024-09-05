export const PAGEING_ENDPOINTS_DATA = [
  {
    endpoint: "/users?page={page}&limt={limit}",
    url: "/users?page=1&limit=10",
    method: "GET",
    action: "유저 목록 페이징"
  },
  {
    endpoint: "/todos?page={page}&limt={limit}",
    url: "/todos?page=1&limit=10",
    method: "GET",
    action: "할 일 목록 페이징"
  },
  {
    endpoint: " /posts?page={page}&limt={limit}",
    url: "/posts?page=1&limit=10",
    method: "GET",
    action: "게시물 목록 페이징"
  },
  {
    endpoint: "/comments?page={page}&limt={limit}",
    url: "/comments?page=1&limit=10",
    method: "GET",
    action: "댓글 목록 페이징"
  },
  {
    endpoint: "/books?page={page}&limt={limit}",
    url: "/books?page=1&limit=10}",
    method: "GET",
    action: "책 목록 페이징"
  },
  {
    endpoint: "/reviews?page={page}&limt={limit}",
    url: "/reviews?page=1&limit=10",
    method: "GET",
    action: "리뷰 목록 페이징"
  }
];
