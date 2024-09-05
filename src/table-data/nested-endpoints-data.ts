export const NESTED_ENDPOINTS_DATA = [
  {
    endpoint: "/users/:id/todos",
    url: "/users/1/todos",
    method: "GET",
    action: "유저별 할 일 목록 조회"
  },
  {
    endpoint: "/users/:id/posts",
    url: "/users/1/posts",
    method: "GET",
    action: "유저별 게시물 목록 조회"
  },
  {
    endpoint: "/users/:id/comment",
    url: "/users/1/comment",
    method: "GET",
    action: "유저별 댓글 목록 조회"
  },
  {
    endpoint: "/users/:id/reviews",
    url: "/users/1/reviews",
    method: "GET",
    action: "유저별 리뷰 목록 조회"
  },
  {
    endpoint: "/books/:id/reviews",
    url: "/books/1/reviews",
    method: "GET",
    action: "책별 리뷰 목록 조회"
  }
];
