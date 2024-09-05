export const FILTER_ENDPOINTS_DATA = [
  {
    endpoint: "/todos?userId={userId}",
    url: "/todos?userId=1",
    method: "GET",
    action: "유저별 할 일 목록"
  },
  {
    endpoint: " /comments?userId={userId}",
    url: "/comments?userId=1",
    method: "GET",
    action: "유저별 댓글 목록"
  },
  {
    endpoint: "/comments?postId={postId}",
    url: "/comments?postId=1",
    method: "GET",
    action: "게시물별 댓글 목록"
  },
  {
    endpoint: "/reviews?bookId={bookId}",
    url: "/reviews?bookId=1",
    method: "GET",
    action: "책별 리뷰 목록"
  },
  {
    endpoint: "/reviews?userId={userId}",
    url: "/reviews?userId=1",
    method: "GET",
    action: "유저별 리뷰 목록"
  }
];
