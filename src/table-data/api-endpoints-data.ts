export const API_ENDPOINT_DATA = [
  // Users Endpoints
  {
    endpoint: "/users/:id",
    url: "/users/1",
    method: "GET",
    action: "유저 조회"
  },
  { endpoint: "/users", method: "GET", action: "유저 목록" },
  {
    endpoint: "/users?page={page}&limit={limit}",
    url: "/users?page=1&limit=10",
    method: "GET",
    action: "유저 목록 페이징"
  },
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
    endpoint: "/users/:id/comments",
    url: "/users/1/comments",
    method: "GET",
    action: "유저별 댓글 목록 조회"
  },
  {
    endpoint: "/users/:id/books",
    url: "/users/1/books",
    method: "GET",
    action: "유저별 책 목록 조회"
  },
  {
    endpoint: "/users/:id/reviews",
    url: "/users/1/reviews",
    method: "GET",
    action: "유저별 리뷰 목록 조회"
  },
  { endpoint: "/users", method: "POST", action: "유저 생성" },
  {
    endpoint: "/users/:id",
    url: "/users/1",
    method: "PUT",
    action: "유저 수정"
  },
  {
    endpoint: "/users/:id",
    url: "/users/1",
    method: "PATCH",
    action: "유저 수정"
  },
  {
    endpoint: "/users/:id",
    url: "/users/1",
    method: "DELETE",
    action: "유저 삭제"
  },

  // Todos Endpoints
  {
    endpoint: "/todos/:id",
    url: "/todos/1",
    method: "GET",
    action: "할 일 조회"
  },
  { endpoint: "/todos", method: "GET", action: "할 일 목록" },
  {
    endpoint: "/todos?userId={userId}",
    url: "/todos?userId=1",
    method: "GET",
    action: "유저별 할 일 목록 조회"
  },
  {
    endpoint: "/todos?page={page}&limit={limit}",
    url: "/todos?page=1&limit=10",
    method: "GET",
    action: "할 일 목록 페이징"
  },
  { endpoint: "/todos", method: "POST", action: "할 일 생성" },
  {
    endpoint: "/todos/:id",
    url: "/todos/1",
    method: "PUT",
    action: "할 일 수정"
  },
  {
    endpoint: "/todos/:id",
    url: "/todos/1",
    method: "PATCH",
    action: "할 일 수정"
  },
  {
    endpoint: "/todos/:id",
    url: "/todos/1",
    method: "DELETE",
    action: "할 일 삭제"
  },

  // Posts Endpoints
  {
    endpoint: "/posts/:id",
    url: "/posts/1",
    method: "GET",
    action: "게시물 조회"
  },
  { endpoint: "/posts", method: "GET", action: "게시물 목록" },
  {
    endpoint: "/posts?page={page}&limit={limit}",
    url: "/posts?page=1&limit=10",
    method: "GET",
    action: "게시물 목록 페이징"
  },
  {
    endpoint: "/posts/:id/comments",
    url: "/posts/1/comments",
    method: "GET",
    action: "게시물 댓글 목록 조회"
  },
  {
    endpoint: "/posts?userId={userId}",
    url: "/posts?userId=1",
    method: "GET",
    action: "유저별 게시물 목록 조회"
  },
  { endpoint: "/posts", method: "POST", action: "게시물 생성" },
  {
    endpoint: "/posts/:id",
    url: "/posts/1",
    method: "PUT",
    action: "게시물 수정"
  },
  {
    endpoint: "/posts/:id",
    url: "/posts/1",
    method: "PATCH",
    action: "게시물 수정"
  },
  {
    endpoint: "/posts/:id",
    url: "/posts/1",
    method: "DELETE",
    action: "게시물 삭제"
  },

  // Comments Endpoints
  {
    endpoint: "/comments/:id",
    url: "/comments/1",
    method: "GET",
    action: "댓글 조회"
  },
  { endpoint: "/comments", method: "GET", action: "댓글 목록" },
  {
    endpoint: "/comments?page={page}&limit={limit}",
    url: "/comments?page=1&limit=10",
    method: "GET",
    action: "댓글 목록 페이징"
  },
  {
    endpoint: "/comments?userId={userId}",
    url: "/comments?userId=1",
    method: "GET",
    action: "유저별 댓글 목록 조회"
  },
  {
    endpoint: "/comments?postId={postId}",
    url: "/comments?userId=1",
    method: "GET",
    action: "게시물 댓글 목록 조회"
  },
  { endpoint: "/comments", method: "POST", action: "댓글 생성" },
  {
    endpoint: "/comments/:id",
    url: "/comments/1",
    method: "PUT",
    action: "댓글 수정"
  },
  {
    endpoint: "/comments/:id",
    url: "/comments/1",
    method: "PATCH",
    action: "댓글 수정"
  },
  {
    endpoint: "/comments/:id",
    url: "/comments/1",
    method: "DELETE",
    action: "댓글 삭제"
  },

  // Books Endpoints
  { endpoint: "/books/:id", url: "/books/1", method: "GET", action: "책 조회" },
  { endpoint: "/books", method: "GET", action: "책 목록" },
  {
    endpoint: "/books?page={page}&limit={limit}",
    url: "/books?page=1&limit=10",
    method: "GET",
    action: "책 목록 페이징"
  },
  {
    endpoint: "/books/:id/reviews",
    url: "/books/1/reviews",
    method: "GET",
    action: "책 리뷰 목록 조회"
  },
  { endpoint: "/books", method: "POST", action: "책 생성" },
  { endpoint: "/books/:id", url: "/books/1", method: "PUT", action: "책 수정" },
  {
    endpoint: "/books/:id",
    url: "/books/1",
    method: "PATCH",
    action: "책 수정"
  },
  {
    endpoint: "/books/:id",
    url: "/books/1",
    method: "DELETE",
    action: "책 삭제"
  },

  // Reviews Endpoints
  {
    endpoint: "/reviews/:id",
    url: "/reviews/1",
    method: "GET",
    action: "리뷰 조회"
  },
  { endpoint: "/reviews", method: "GET", action: "리뷰 목록" },
  {
    endpoint: "/reviews?page={page}&limit={limit}",
    url: "/reviews?page=1&limit=10",
    method: "GET",
    action: "리뷰 목록 페이징"
  },
  {
    endpoint: "/reviews?userId={userId}",
    url: "/reviews?userId=1",
    method: "GET",
    action: "유저별 리뷰 조회"
  },
  {
    endpoint: "/reviews?bookId={bookId}",
    url: "/reviews?bookId=1",
    method: "GET",
    action: "책별 리뷰 조회"
  },
  { endpoint: "/reviews", method: "POST", action: "리뷰 생성" },
  {
    endpoint: "/reviews/:id",
    url: "/reviews/1",
    method: "PUT",
    action: "리뷰 수정"
  },
  {
    endpoint: "/reviews/:id",
    url: "/reviews/1",
    method: "PATCH",
    action: "리뷰 수정"
  },
  {
    endpoint: "/reviews/:id",
    url: "/reviews/1",
    method: "DELETE",
    action: "리뷰 삭제"
  },

  // auth endpoints
  {
    endpoint: "/auth/login",
    url: "/auth/login",
    method: "POST",
    action: "로그인"
  },
  {
    endpoint: "/auth/user",
    url: "/auth",
    method: "GET",
    action: "유저 조회"
  },
  {
    endpoint: "/auth/refresh",
    url: "/auth/refresh",
    method: "GET",
    action: "토큰 재발급"
  },

  // image endpoints
  {
    endpoint:
      "/image?size={size}&bgColor={bgColor}&text={text}&ext={ext}&textColor={textColor}",
    url: "/image?size=500&bgColor=2E64FE&text=KoreanDummyJSON&ext=jpg&textColor=FFFFFF",
    method: "GET",
    action: "동적 이미지 생성"
  },

  // lorem endpoints
  {
    endpoint: "/lorem?mode={mode}&count={count}&length={length}",
    url: "/lorem?mode=p&count=2&length=200",
    method: "GET",
    action: "한글 로렘 입숨 생성"
  }
];

export const ID_ENDPOINT_DATA = API_ENDPOINT_DATA.filter(
  (data) => data.endpoint.endsWith("/:id") && data.method === "GET"
);

export const LIST_ENDPOINT_DATA = API_ENDPOINT_DATA.filter((data) =>
  data.action.endsWith("목록")
);

export const PAGING_ENDPOINT_DATA = API_ENDPOINT_DATA.filter((data) =>
  data.action.endsWith("페이징")
);

export const POST_ENDPOINT_DATA = API_ENDPOINT_DATA.filter(
  (data) => data.method === "POST" && data.action !== "로그인"
);

export const PUT_ENDPOINT_DATA = API_ENDPOINT_DATA.filter(
  (data) => data.method === "PUT"
);

export const PATCH_ENDPOINT_DATA = API_ENDPOINT_DATA.filter(
  (data) => data.method === "PATCH"
);

export const DELETE_ENDPOINT_DATA = API_ENDPOINT_DATA.filter(
  (data) => data.method === "DELETE"
);

export const FILTER_ENDPOINT_DATA = API_ENDPOINT_DATA.filter(
  (data) => data.endpoint.includes("?") && data.action.includes("별")
);

export const NESTED_ENDPOINT_DATA = API_ENDPOINT_DATA.filter(
  (data) => !data.endpoint.includes("?") && data.action.includes("별")
);
