# <img src="https://github.com/user-attachments/assets/5247b4cb-6780-496b-8015-f66e81d36c15" width="70" height="70" align="center"/> Korean dummy JSON

### 📃 목차 (클릭 시 해당 목차로 이동합니다.)

- [👋 프로젝트 소개](#-프로젝트-소개)

- [⚙ 개발환경](#-개발환경)

- [📚 제공 리소스](#-제공-리소스)

- [✨ 사용 예시 코드](#-사용-예시-코드)

- [📖 Pagination Endpoints](#-pagination-endpoints)

- [🗜 Filter Endpoints](#-filter-endpoints)

- [⛓ Nested Endpoints](#-nested-endpoints)
    
- [📜 All API Endpoints](#-all-api-endpoints)

<br/>

### 👋 프로젝트 소개
**Korean Dummy JSON**은 한국어 기반의 더미 데이터를 제공하기 위해 제작된 프로젝트로, <a href="https://jsonplaceholder.typicode.com/">JSONPlaceholder</a>에 영감을 받아 개발되었습니다.

한국어로 구성된 데이터를 통해 개발자들이 보다 현실적인 더미 데이터를 제공 받을 수 있습니다.

추가로 JWT 기반 로그인 및 인증/인가 더미 API가 제공됩니다.

가입할 필요없이 간편하게 바로 사용할 수 있습니다.

GET, POST, PUT, PATCH, DELETE 요청을 보내고 직접 테스트 해보고 학습해 보세요.

#### 🔗 배포 URL : [Korean Dummy JSON](https://koreandummyjson.site/)

<br/>

### ⚙ 개발환경

| 프론트엔드                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 벡엔드                                                                                                                                                                                                                                                                                | 디자인                                                                                    | 배포, 관리                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img alt="Html" src ="https://img.shields.io/badge/HTML5-E34F26?logo=HTML5&logoColor=white"/> <img alt="CSS" src ="https://img.shields.io/badge/CSS3-1572B6?logo=CSS3&logoColor=white"/> <img alt="TypeScript" src ="https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/react-61DAFB?logo=react&logoColor=black"> <img src ="https://img.shields.io/badge/next.js-000000?logo=nextdotjs&logoColor=white"/> <img src="https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss"> | <img src ="https://img.shields.io/badge/next.js_API_Routes-000000?logo=nextdotjs&logoColor=white"/> <img src="https://img.shields.io/badge/mysql-4479A1?style=flat&logo=mysql&logoColor=white"> | <img src="https://img.shields.io/badge/figma-F24E1E?logo=figma&logoColor=white"> | <img src="https://img.shields.io/badge/vercel-000000?logo=vercel&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?logo=github&logoColor=white"> |

<br/>

### 📚 제공 리소스
**users, posts, comments, todos, books, reviews, auth** 7개의 리소스가 제공됩니다.

| Resource   | Information     |
|------------|-----------------|
| <a href="https://koreandummyjson.site/api/users">/users</a>     | 유저 20명        |
| <a href="https://koreandummyjson.site/api/posts">/posts</a>     | 게시물 100개     |
| <a href="https://koreandummyjson.site/api/comments">/comments</a>  | 댓글 500개       |
| <a href="https://koreandummyjson.site/api/todos">/todos</a>    | 할 일 200개      |
| <a href="https://koreandummyjson.site/api/books">/books</a>    | 책 100개         |
| <a href="https://koreandummyjson.site/api/reviews">/reviews</a>    | 리뷰 500개       |
| <a href="/#">/auth</a>    | 로그인 및 인증/인가      |

<br/>

### ✨ 사용 예시 코드
예시 코드에서는 Fetch API를 사용합니다.

각 예시 코드를 복사한 후 브라우저 콘솔에서 실행해 보세요.

자세한 사용법을 알고 싶으시면 리소스별 [📃Docs](https://koreandummyjson.site/docs/users) 페이지를 참고해 주세요.

#### 1 ) 데이터 조회하기

```javascript
fetch("https://koreandummyjson.site/api/posts/1")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));
```
결과
```json
{
  "message": "게시물 조회 성공",
  "post": {
    "id": 1,
    "title": "서울의 숨겨진 명소",
    "content": "서울에는 잘 알려지지 않은 멋진 명소가 많다. 최근에 방문한 작은 카페와 조용한 공원이 특히 기억에 남는다. 이곳은 복잡한 도시를 벗어나 평화로운 시간을 보낼 수 있는 완벽한 장소였다. 특히, 따뜻한 차와 함께 창밖을 바라보며 책을 읽는 시간이 정말 행복했다.",
    "imgUrl": "https://picsum.photos/id/1/300/300",
    "createdAt": "2024-01-01T08:00:00.000Z",
    "userId": 1
  }
}
```

<br/>

#### 2 ) 데이터 목록 조회하기

```javascript
fetch("https://koreandummyjson.site/api/posts")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));
```
결과
```json
{
  "message": "게시물 목록 조회 성공",
  "posts": [
    {
      "id": 1,
      "title": "서울의 숨겨진 명소",
      "content": "서울에는 잘 알려지지 않은 멋진 명소가 많다. 최근에 방문한 작은 카페와 조용한 공원이 특히 기억에 남는다. 이곳은 복잡한 도시를 벗어나 평화로운 시간을 보낼 수 있는 완벽한 장소였다. 특히, 따뜻한 차와 함께 창밖을 바라보며 책을 읽는 시간이 정말 행복했다.",
      "imgUrl": "https://picsum.photos/id/1/300/300",
      "createdAt": "2024-01-01T08:00:00.000Z",
      "userId": 1
    },
    {
      "id": 2,
      "title": "여름 바다의 매력",
      "content": "여름이 다가오면서 바다를 찾는 사람들로 가득하다. 바닷가에서의 하루는 언제나 특별하다. 모래사장 위를 걷고, 파도 소리를 들으며, 시원한 바람을 맞는 순간들은 잊을 수 없는 기억이 된다. 특히, 일몰 때 바다를 바라보며 찍은 사진은 너무 아름다웠다.",
      "imgUrl": "https://picsum.photos/id/2/300/300",
      "createdAt": "2024-01-03T09:00:00.000Z",
      "userId": 2
    },
    ...
  ]
}
```

<br/>

#### 3 ) 데이터 페이지네이션
```javascript
fetch("https://koreandummyjson.site/api/posts?page=1&limit=10")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));
```
결과
```json
{
  "message": "게시물 목록 조회 성공",
  "posts": [
    {
      "id": 1,
      "title": "서울의 숨겨진 명소",
      "content": "서울에는 잘 알려지지 않은 멋진 명소가 많다. 최근에 방문한 작은 카페와 조용한 공원이 특히 기억에 남는다. 이곳은 복잡한 도시를 벗어나 평화로운 시간을 보낼 수 있는 완벽한 장소였다. 특히, 따뜻한 차와 함께 창밖을 바라보며 책을 읽는 시간이 정말 행복했다.",
      "imgUrl": "https://picsum.photos/id/1/300/300",
      "createdAt": "2024-01-01T08:00:00.000Z",
      "userId": 1
    },
    {
      "id": 2,
      "title": "여름 바다의 매력",
      "content": "여름이 다가오면서 바다를 찾는 사람들로 가득하다. 바닷가에서의 하루는 언제나 특별하다. 모래사장 위를 걷고, 파도 소리를 들으며, 시원한 바람을 맞는 순간들은 잊을 수 없는 기억이 된다. 특히, 일몰 때 바다를 바라보며 찍은 사진은 너무 아름다웠다.",
      "imgUrl": "https://picsum.photos/id/2/300/300",
      "createdAt": "2024-01-03T09:00:00.000Z",
      "userId": 2
    },
    ...
  ],
  "page": 1,
  "limit": 10,
  "hasNextPage": true
}
```

<br/>

#### 4 ) 데이터 생성하기

```javascript
fetch("https://koreandummyjson.site/api/posts", {
  method: "POST",
  body: JSON.stringify({
    "title": "테스트 글",
    "content": "테스트 글 입니다.",
    "imgUrl": "https://picsum.photos/id/1/300/300",
    "userId": 1
}),
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));
```
결과
```json
{
  "message": "게시물 생성 성공",
  "post": {
    "id": 101,
    "title": "테스트 글",
    "content": "테스트 글 입니다.",
    "imgUrl": "https://picsum.photos/id/1/300/300",
    "createdAt": "2024-09-07T16:09:43.814Z",
    "userId": 1
  }
}
```

<br/>

#### 5 ) 데이터 수정하기(PUT)

```javascript
fetch("https://koreandummyjson.site/api/posts/1", {
  method: "PUT",
  body: JSON.stringify({
    "title": "테스트 글",
    "contnet": "테스트 글 입니다.",
    "imgUrl": "https://picsum.photos/id/2/300/300"
}),
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));
```
결과
```json
{
  "message": "게시물 수정 성공",
  "post": {
    "id": 1,
    "title": "테스트 글",
    "imgUrl": "https://picsum.photos/id/2/300/300",
    "createdAt": "2024-01-01T08:00:00.000Z",
    "userId": 1
  }
}
```

<br/>

#### 6 ) 데이터 수정하기(PATCH)

```javascript
fetch("https://koreandummyjson.site/api/posts/1", {
  method: "PATCH",
  body: JSON.stringify({
    "title": "테스트 글"
}),
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));
```
결과
```json
{
  "message": "게시물 수정 성공",
  "post": {
    "id": 1,
    "title": "테스트 글",
    "content": "서울에는 잘 알려지지 않은 멋진 명소가 많다. 최근에 방문한 작은 카페와 조용한 공원이 특히 기억에 남는다. 이곳은 복잡한 도시를 벗어나 평화로운 시간을 보낼 수 있는 완벽한 장소였다. 특히, 따뜻한 차와 함께 창밖을 바라보며 책을 읽는 시간이 정말 행복했다.",
    "imgUrl": "https://picsum.photos/id/1/300/300",
    "createdAt": "2024-01-01T08:00:00.000Z",
    "userId": 1
  }
}
```

<br/>

#### 7 ) 데이터 삭제하기

```javascript
fetch("https://koreandummyjson.site/api/posts/1", {
  method: "DELETE"
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));

```
결과
```json
{
  "message": "1번 게시물 삭제 성공"
}
```

<br/>

#### 8 ) 데이터 필터링하기

```javascript
fetch("https://koreandummyjson.site/api/posts/?userId=1")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));
```
결과
```json
{
  "message": "게시물 목록 조회 성공",
  "posts": [
    {
      "id": 1,
      "title": "서울의 숨겨진 명소",
      "content": "서울에는 잘 알려지지 않은 멋진 명소가 많다. 최근에 방문한 작은 카페와 조용한 공원이 특히 기억에 남는다. 이곳은 복잡한 도시를 벗어나 평화로운 시간을 보낼 수 있는 완벽한 장소였다. 특히, 따뜻한 차와 함께 창밖을 바라보며 책을 읽는 시간이 정말 행복했다.",
      "imgUrl": "https://picsum.photos/id/1/300/300",
      "createdAt": "2024-01-01T08:00:00.000Z",
      "userId": 1
    },
    {
      "id": 21,
      "title": "여행의 추억",
      "content": "여행 중 촬영한 사진들을 보며 그때의 추억이 새록새록 떠오른다. 특히, 그 지역의 아름다운 풍경과 현지 음식들은 잊을 수 없는 경험이었다. 여행을 통해 얻은 소중한 기억들을 계속 간직하고 싶다.",
      "imgUrl": "https://picsum.photos/id/21/300/300",
      "createdAt": "2024-04-11T12:00:00.000Z",
      "userId": 1
    },
    {
      "id": 41,
      "title": "서울의 명소 탐방",
      "content": "서울의 다양한 명소를 탐방하는 것은 언제나 즐거운 일이다. 오늘은 남산타워를 방문하여 서울의 전경을 감상하고, 맛있는 음식을 즐기며 좋은 시간을 보냈다.",
      "imgUrl": "https://picsum.photos/id/41/300/300",
      "createdAt": "2024-07-05T16:00:00.000Z",
      "userId": 1
    },
    {
      "id": 61,
      "title": "서울의 역사 탐방",
      "content": "서울의 역사를 탐방하는 것은 흥미로운 경험이다. 오늘은 서울의 고궁을 방문하여 역사의 흔적을 느꼈다. 과거와 현재가 만나는 장소에서 많은 것을 배웠다.",
      "imgUrl": "https://picsum.photos/id/61/300/300",
      "createdAt": "2024-08-11T18:00:00.000Z",
      "userId": 1
    },
    {
      "id": 81,
      "title": "가을의 풍경",
      "content": "가을이 깊어지면서 자연이 황금빛으로 물들어 간다. 오늘은 공원에서 노란 은행나무를 보며 가을의 정취를 만끽했다. 이런 순간들이 가을을 더욱 특별하게 만든다.",
      "imgUrl": "https://picsum.photos/id/81/300/300",
      "createdAt": "2024-09-10T08:00:00.000Z",
      "userId": 1
    }
  ]
}
```

<br/>

#### 9 ) 중첩 하위 데이터 조회하기

```javascript
fetch("https://koreandummyjson.site/api/posts/1/comments")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));
```
결과
```json
{
{
  "message": "게시물 댓글 목록 조회 성공",
  "comments": [
    {
      "id": 1,
      "commentId": 1,
      "content": "정말 유익한 게시물입니다!",
      "createdAt": "2024-04-11T12:01:00.000Z"
    },
    {
      "id": 1,
      "commentId": 2,
      "content": "좋은 정보 감사합니다.",
      "createdAt": "2024-04-11T12:03:00.000Z"
    },
    {
      "id": 1,
      "commentId": 3,
      "content": "이 주제에 대해 더 알고 싶어요.",
      "createdAt": "2024-04-11T12:06:00.000Z"
    },
    {
      "id": 1,
      "commentId": 4,
      "content": "도움이 많이 되었어요.",
      "createdAt": "2024-04-11T12:10:00.000Z"
    },
    {
      "id": 1,
      "commentId": 5,
      "content": "잘 읽었습니다.",
      "createdAt": "2024-04-11T12:15:00.000Z"
    }
  ]
}
}
```

<br/>

### 📖 Pagination Endpoints
아래와 같은 페이지네이션 endpoints를 제공합니다.

| Endpoint | Method | Action |
|----------|--------|--------|
| <a href="/api/users?page=1&limit=10" class="text-blue-600 hover:underline">/users?page={page}&limit={limit}</a> | GET | 유저 목록 페이징 |
| <a href="/api/todos?page=1&limit=10" class="text-blue-600 hover:underline">/todos?page={page}&limit={limit}</a> | GET | 할 일 목록 페이징 |
| <a href="/api/posts?page=1&limit=10" class="text-blue-600 hover:underline">/posts?page={page}&limit={limit}</a> | GET | 게시물 목록 페이징 |
| <a href="/api/comments?page=1&limit=10" class="text-blue-600 hover:underline">/comments?page={page}&limit={limit}</a> | GET | 댓글 목록 페이징 |
| <a href="/api/books?page=1&limit=10" class="text-blue-600 hover:underline">/books?page={page}&limit={limit}</a> | GET | 책 목록 페이징 |
| <a href="/api/reviews?page=1&limit=10" class="text-blue-600 hover:underline">/reviews?page={page}&limit={limit}</a> | GET | 리뷰 목록 페이징 |

<br/>

### 🗜 Filter Endpoints
아래와 같은 필터링 endpoints를 제공합니다.

| Endpoint | Method | Action |
|----------|--------|--------|
| <a href="/api/todos?userId=1" class="text-blue-600 hover:underline">/todos?userId={userId}</a> | GET | 유저별 할 일 목록 |
| <a href="/api/comments?userId=1" class="text-blue-600 hover:underline">/comments?userId={userId}</a> | GET | 유저별 댓글 목록 |
| <a href="/api/comments?postId=1" class="text-blue-600 hover:underline">/comments?postId={postId}</a> | GET | 게시물별 댓글 목록 |
| <a href="/api/reviews?bookId=1" class="text-blue-600 hover:underline">/reviews?bookId={bookId}</a> | GET | 책별 리뷰 목록 |
| <a href="/api/reviews?userId=1" class="text-blue-600 hover:underline">/reviews?userId={userId}</a> | GET | 유저별 리뷰 목록 |

<br/>

### ⛓ Nested Endpoints
아래와 같은 하위 endpoints를 제공합니다.

| Endpoint | Method | Action |
|----------|--------|--------|
| <a href="/api/users/1/todos" class="text-blue-600 hover:underline">/users/:id/todos</a> | GET | 유저별 할 일 목록 조회 |
| <a href="/api/users/1/posts" class="text-blue-600 hover:underline">/users/:id/posts</a> | GET | 유저별 게시물 목록 조회 |
| <a href="/api/users/1/comment" class="text-blue-600 hover:underline">/users/:id/comment</a> | GET | 유저별 댓글 목록 조회 |
| <a href="/api/users/1/reviews" class="text-blue-600 hover:underline">/users/:id/reviews</a> | GET | 유저별 리뷰 목록 조회 |
| <a href="/api/books/1/reviews" class="text-blue-600 hover:underline">/books/:id/reviews</a> | GET | 책별 리뷰 목록 조회 |

<br/>

### 📜 All API Endpoints
| Endpoint                           | Method | Action                    |
|------------------------------------|--------|---------------------------|
| <a href="https://koreandummyjson.site/api/users/1">/users/:id</a>                         | GET    | 유저 조회                 |
| <a href="https://koreandummyjson.site/api/users">/users</a>                             | GET    | 유저 목록                 |
| <a href="https://koreandummyjson.site/api/users?page=1&limit=10">/users?page={page}&limit={limit}</a>   | GET    | 유저 목록 페이지           |
| <a href="https://koreandummyjson.site/api/users/1/todos">/users/:id/todos</a>                     | GET    | 유저 할 일 목록 조회       |
| <a href="https://koreandummyjson.site/api/users/1/posts">/users/:id/posts</a>                   | GET    | 유저 게시물 목록 조회      |
| <a href="https://koreandummyjson.site/api/users/1/comments">/users/:id/comments</a>                | GET    | 유저 댓글 목록 조회        |
| <a href="https://koreandummyjson.site/api/users/1/books">/users/:id/books</a>                   | GET    | 유저 책 목록 조회          |
| <a href="https://koreandummyjson.site/api/users/1/reviews">/users/:id/reviews</a>                 | GET    | 유저 리뷰 목록 조회        |
| <a href="https://koreandummyjson.site/api/users">/users</a>                             | POST   | 유저 생성                 |
| <a href="https://koreandummyjson.site/api/users/1">/users/:id</a>                         | PUT    | 유저 수정                 |
| <a href="https://koreandummyjson.site/api/users/1">/users/:id</a>                             | PATCH  | 유저 수정                 |
| <a href="https://koreandummyjson.site/api/users/1">/users/:id</a>                             | DELETE | 유저 삭제                 |
| <a href="https://koreandummyjson.site/api/todos/1">/todos/:id</a>                        | GET    | 할 일 조회                |
| <a href="https://koreandummyjson.site/api/todos">/todos</a>                             | GET    | 할 일 목록                |
| <a href="https://koreandummyjson.site/api/todos?userId=1">/todos?userId={userId}</a>             | GET    | 유저 할 일 목록 필터링     |
| <a href="https://koreandummyjson.site/api/todos?page=1&limit=10">/todos?page={page}&limit={limit}</a>   | GET    | 할 일 목록 페이지          |
| <a href="https://koreandummyjson.site/api/todos">/todos</a>                             | POST   | 할 일 생성                |
| <a href="https://koreandummyjson.site/api/todos/1">/todos/:id</a>                        | PUT    | 할 일 수정                |
| <a href="https://koreandummyjson.site/api/todos/1">/todos/:id</a>                         | PATCH  | 할 일 수정                |
| <a href="https://koreandummyjson.site/api/todos/1">/todos/:id</a>                         | DELETE | 할 일 삭제                |
| <a href="https://koreandummyjson.site/api/posts/1">/posts/:id</a>                        | GET    | 게시물 조회               |
| <a href="https://koreandummyjson.site/api/posts">/posts</a>                             | GET    | 게시물 목록               |
| <a href="https://koreandummyjson.site/api/posts?page=1&limit=10">/posts?page={page}&limit={limit}</a>   | GET    | 게시물 목록 페이지         |
| <a href="https://koreandummyjson.site/api/posts/comments">/posts/:id/comments</a>                | GET    | 게시물 댓글 목록 조회      |
| <a href="https://koreandummyjson.site/api/posts?userId=1">/posts?userId={userId}</a>             | GET    | 유저 게시물 목록 필터링    |
| <a href="https://koreandummyjson.site/api/posts">/posts</a>                             | POST   | 게시물 생성               |
| <a href="https://koreandummyjson.site/api/posts/1">/posts/:id</a>                         | PUT    | 게시물 수정               |
| <a href="https://koreandummyjson.site/api/posts/1">/posts/:id</a>                         | PATCH  | 게시물 수정               |
| <a href="https://koreandummyjson.site/api/posts/1">/posts/:id</a>                         | DELETE | 게시물 삭제               |
| <a href="https://koreandummyjson.site/api/comments/1">/comments/:id</a>                      | GET    | 댓글 조회                 |
| <a href="https://koreandummyjson.site/api/comments">/comments</a>                          | GET    | 댓글 목록                 |
| <a href="https://koreandummyjson.site/api/comments?page=1&limit=10">/comments?page={page}&limit={limit}</a> | GET    | 댓글 목록 페이지           |
| <a href="https://koreandummyjson.site/api/comments?userId=1">/comments?userId={userId}</a>          | GET    | 유저 댓글 목록 필터링      |
| <a href="https://koreandummyjson.site/api/comments?postId=1">/comments?postId={postId}</a>          | GET    | 게시물 댓글 목록 필터링    |
| <a href="https://koreandummyjson.site/api/comments">/comments</a>                          | POST   | 댓글 생성                 |
| <a href="https://koreandummyjson.site/api/comments/1">/comments/:id</a>                      | PUT    | 댓글 수정                 |
| <a href="https://koreandummyjson.site/api/comments/1">/comments/:id</a>                      | PATCH  | 댓글 수정                 |
| <a href="https://koreandummyjson.site/api/comments/1">/comments/:id</a>                      | DELETE | 댓글 삭제                 |
| <a href="https://koreandummyjson.site/api/books/1">/books/:id</a>                          | GET    | 책 조회                   |
| <a href="https://koreandummyjson.site/api/books/1">/books</a>                             | GET    | 책 목록                   |
| <a href="https://koreandummyjson.site/api/books?page=1&limit=10">/books?page={page}&limit={limit}</a>    | GET    | 책 목록 페이지             |
| <a href="https://koreandummyjson.site/api/books/1/reviews">/books/:id/reviews</a>                 | GET    | 책 리뷰 목록 조회          |
| <a href="https://koreandummyjson.site/api/books">/books</a> | POST   | 책 생성                   |
| <a href="https://koreandummyjson.site/api/books/1">/books/:id</a> | PUT    | 책 수정                   |
| <a href="https://koreandummyjson.site/api/books/1">/books/:id</a> | PATCH  | 책 수정                   |
| <a href="https://koreandummyjson.site/api/books/1">/books/:id</a> | DELETE | 책 삭제                   |
| <a href="https://koreandummyjson.site/api/reviews/1">/reviews/:id</a>                       | GET    | 리뷰 조회                 |
| <a href="https://koreandummyjson.site/api/reviews">/reviews</a>                           | GET    | 리뷰 목록                 |
| <a href="https://koreandummyjson.site/api/reviews?page=1&limit=10">/reviews?page={page}&limit={limit}</a> | GET    | 리뷰 목록 페이지           |
| <a href="https://koreandummyjson.site/api/reviews?userId=1">/reviews?userId={userId}</a>           | GET    | 유저 리뷰 필터링           |
| <a href="https://koreandummyjson.site/api/reviews?bookId=1">/reviews?bookId={bookId}</a>           | GET    | 책 리뷰 필터링             |
| <a href="https://koreandummyjson.site/api/reviews">/reviews</a>                           | POST   | 리뷰 생성                 |
| <a href="https://koreandummyjson.site/api/reviews/1">/reviews/:id</a>                       | PUT    | 리뷰 수정                 |
| <a href="https://koreandummyjson.site/api/reviews/1">/reviews/:id</a>                       | PATCH  | 리뷰 수정                 |
| <a href="https://koreandummyjson.site/api/reviews/1">/reviews/:id</a>                       | DELETE | 리뷰 삭제                 |
| <a href="https://koreandummyjson.site/api/auth/login">/auth/login</a>                       | POST   | 로그인                    |
| <a href="https://koreandummyjson.site/api/auth/user">/auth/user</a>                         | GET    | 유저 조회                 |
| <a href="https://koreandummyjson.site/api/auth/refreshToken">/auth/refresh</a>                      | GET    | 토큰 재발급               |


