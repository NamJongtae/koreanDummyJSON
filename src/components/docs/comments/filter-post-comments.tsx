import React from 'react'
import FetchSection from '../../commons/fetch-section/fetch-section';

export default function FilterPostComments() {
  return (
    <FetchSection
      id="게시물-댓글-목록-필터링하기"
      title="게시물 댓글 목록 필터링하기"
      endpoint="/api/comments?postId={postId}"
      method="GET"
      descriptions={
        <>
          <p className="section-text mb-2">
            댓글 목록을 필터링하여 해당되는 게시물의 댓글 목록을 조회합니다.
          </p>
          <p className="section-text mb-4">
            코드를 복사하여 Fetch URL의
            <span className="font-medium"> postId</span>를 변경해 보세요.
          </p>
        </>
      }
      fetchUrl="/comments?postId=1"
    />
  );
}
