# <img src="https://github.com/user-attachments/assets/5247b4cb-6780-496b-8015-f66e81d36c15" width="70" height="70" align="center"/> Korean Dummy JSON

### 📃 목차 (클릭 시 해당 목차로 이동합니다.)

- [👋 프로젝트 소개](#-프로젝트-소개)

- [🎈 Npm package](#-npm-package)

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

추가로 JWT 기반 로그인 및 인증/인가 더미 API 및 동적 더미 이미지 생성 API가 제공됩니다.

또한, 한글 로렘 입숨 생성 API가 제공되며, 사이트에서 한글 로렘 생성기를 통해 직접 한글 로렘을 생성할 수도 있습니다.

가입할 필요없이 간편하게 바로 사용할 수 있습니다.

`GET`, `POST`, `PUT`, `PATCH`, `DELETE` 요청을 보내고 직접 테스트 해보고 학습해 보세요.

📅 **개발 기간 : 2024. 08. 27. ~ 2024. 09. 14.**

📆 **리팩토링 기간 : 2025. 06. 22 ~ 2025. 07.07.**

#### 🔗 배포 URL : [📚 Korean Dummy JSON](https://koreandummyjson.vercel.app/)

<br/>

### 🎈 Npm Package

[Korean Dummy Json Fetcher](https://www.npmjs.com/package/korean-dummy-json-fetcher/)

> `KoreanDummyJsonFetcher`는 비동기 API를 직접 호출하지 않아도, 현재 프로젝트에서 더미 JSON 데이터를 손쉽게 활용할 수 있도록 도와주는 라이브러리입니다.

#### 설치

**npm**
```bash
npm install korean-dummy-json-fetcher
```

**yarn**
```bash
yarn add korean-dummy-json-fetcher
```

**pnpm**
```bash
pnpm add korean-dummy-json-fetcher
```

#### CDN

```html
<script src="https://cdn.unpkg.com/npm/korean-dummy-json-fetcher@1.1.2"></script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/korean-dummy-json-fetcher@1.1.2"></script>
```

<br/>

### ⚙ 개발환경

| 프론트엔드                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 벡엔드                                                                                              | DB                                                                                  | 디자인                                                                           | 배포, 관리                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img alt="Html" src ="https://img.shields.io/badge/HTML5-E34F26?logo=HTML5&logoColor=white"/> <img alt="CSS" src ="https://img.shields.io/badge/CSS3-1572B6?logo=CSS3&logoColor=white"/> <img alt="TypeScript" src ="https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/react-61DAFB?logo=react&logoColor=black"> <img src ="https://img.shields.io/badge/next.js-000000?logo=nextdotjs&logoColor=white"/> <img src="https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss"> | <img src ="https://img.shields.io/badge/next.js_API_Routes-000000?logo=nextdotjs&logoColor=white"/> | <img src="https://img.shields.io/badge/sqlite3-003B57?logo=sqlite&logoColor=white"> | <img src="https://img.shields.io/badge/figma-F24E1E?logo=figma&logoColor=white"> | <img src="https://img.shields.io/badge/vercel-000000?logo=vercel&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?logo=github&logoColor=white"> |

<br/>

### 📚 제공 리소스

**users, posts, comments, todos, books, reviews, auth** 7개의 리소스가 제공됩니다.

| Resource                                                          | Information           |
| ----------------------------------------------------------------- | --------------------- |
| <a href="https://koreandummyjson.vercel.app/api/users">/users</a>       | 유저 20명             |
| <a href="https://koreandummyjson.vercel.app/api/posts">/posts</a>       | 게시물 100개          |
| <a href="https://koreandummyjson.vercel.app/api/comments">/comments</a> | 댓글 500개            |
| <a href="https://koreandummyjson.vercel.app/api/todos">/todos</a>       | 할 일 200개           |
| <a href="https://koreandummyjson.vercel.app/api/books">/books</a>       | 책 100개              |
| <a href="https://koreandummyjson.vercel.app/api/reviews">/reviews</a>   | 리뷰 500개            |
| <a href="/#">/auth</a>                                            | 로그인 및 인증/인가   |
| <a href="https://koreandummyjson.vercel.app/api/image">/image</a>       | 동적 더미 이미지 생성 |
| <a href="https://koreandummyjson.vercel.app/api/lorem">/lorem</a>     | 한글 로렘 입숨 생성|

<br/>

### ✨ 사용 예시 코드

예시 코드에서는 Fetch API를 사용합니다.

각 예시 코드를 복사한 후 브라우저 콘솔에서 실행해 보세요.

자세한 사용법을 알고 싶으시면 리소스별 [📃Docs](https://koreandummyjson.vercel.app/docs/users) 페이지를 참고해 주세요.

#### 1 ) 데이터 조회하기

```javascript
fetch("https://koreandummyjson.vercel.app/api/posts/1")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching data:", error));
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
fetch("https://koreandummyjson.vercel.app/api/posts")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching data:", error));
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
fetch("https://koreandummyjson.vercel.app/api/posts?page=1&limit=10")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching data:", error));
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
fetch("https://koreandummyjson.vercel.app/api/posts", {
  method: "POST",
  body: JSON.stringify({
    title: "테스트 글",
    content: "테스트 글 입니다.",
    imgUrl: "https://picsum.photos/id/1/300/300",
    userId: 1
  }),
  headers: {
    "Content-Type": "application/json"
  }
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching data:", error));
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
fetch("https://koreandummyjson.vercel.app/api/posts/1", {
  method: "PUT",
  body: JSON.stringify({
    title: "테스트 글",
    contnet: "테스트 글 입니다.",
    imgUrl: "https://picsum.photos/id/2/300/300"
  }),
  headers: {
    "Content-Type": "application/json"
  }
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching data:", error));
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
fetch("https://koreandummyjson.vercel.app/api/posts/1", {
  method: "PATCH",
  body: JSON.stringify({
    title: "테스트 글"
  }),
  headers: {
    "Content-Type": "application/json"
  }
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching data:", error));
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
fetch("https://koreandummyjson.vercel.app/api/posts/1", {
  method: "DELETE"
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching data:", error));
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
fetch("https://koreandummyjson.vercel.app/api/posts/?userId=1")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching data:", error));
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
fetch("https://koreandummyjson.vercel.app/api/posts/1/comments")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching data:", error));
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

#### 10 ) 로그인

```javascript
fetch("https://koreandummyjson.vercel.app/api/auth/login", {
  method: "POST",
  body: JSON.stringify({
    "id": "test",
    "password": "1234",
    "ATExp": 600,
    "RTExp": 3600
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
  "message": "로그인 성공",
  "accessToken": "accessToken",
  "refreshToken": "refreshToken"
}
```

<br/>

#### 11 ) accessToken를 통해 유저 조회
```javascript
fetch("https://koreandummyjson.vercel.app/api/auth/user", {
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer accessToken 입력"
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));
```

결과

```json
{
  "message": "토큰 인증 성공",
  "userId": "test"
}
```

<br/>

#### 12 ) accessToken 재발급

```javascript
fetch("https://koreandummyjson.vercel.app/api/auth/refresh", {
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer refershToken 입력"
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));
```

결과

```json
{
  "message": "accessToken 재발급 성공",
  "accessToken": "accessToken"
}
```

<br/>

#### 13 ) 동적 더미 이미지 생성

```javascript
fetch("https://koreandummyjson.vercel.app/api/image?size=300x300&text=KoreanDummyJSON&textColor=2E64FE")
  .then(response => response.blob())
  .then(blob => console.log(blob))
  .catch(error => console.error('Error fetching blob:', error));
```

결과

<img src="https://koreandummyjson.vercel.app/api/image?size=300x300&text=KoreanDummyJSON&textColor=2E64FE">

<br/>

#### 14 ) 한글 로렘 입숨 생성

```javascript
fetch("https://koreandummyjson.vercel.app/api/lorem?mode=p&count=2&length=200")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));
```

결과

```json
{
  "result": "알림처럼 인터넷을 문서와도 검색로서 사용자마저호화롭다. 의자로써 여성에 치약께는 멘토에서도 쿠션께 접속께쓸다. 렌즈과도 초등학생라도 포장께 주전자만큼은 잘라내기썰다. 연수밖에는 다리미판랑 식기세척기에서 정렬마저 호화롭다. 복학생께는 카운터한테서 멘토이라도 모바일께는 총명하다. 운전사이 명함은 청중만큼은 구독치고는 사진이라운동하다. 서류으로 연수마저는 꽃커.\n\n팔로우도 결제정도는 검색에서는 외할머니커녕 방평온하다. 바닥따라는 카드마냥 농구과 바닥이랑 노트북쯤은불경하다. 삼촌나마 교육로 시장와는 커뮤니티하고 동기화이약속하다. 위치의 회원가입나마 연구원에는 목도리에 카메내성적이다. 경품으로 커튼께도 첨부든가 여행마저 학생보다 풍성하다. 어린이로써 충전기와는 판매자에 환경설정이나는구체적이다. 유통사까지 태그만은 재고."
}
```

<br/>

### 📖 Pagination Endpoints

아래와 같은 페이지네이션 endpoints를 제공합니다.

| Endpoint                                                                        | Method | Action             |
| ------------------------------------------------------------------------------- | ------ | ------------------ |
| <a href="https://koreandummyjson.vercel.app/api/users?page=1&limit=10">/users?page={page}&limit={limit}</a>       | GET    | 유저 목록 페이징   |
| <a href="https://koreandummyjson.vercel.app/api/todos?page=1&limit=10">/todos?page={page}&limit={limit}</a>       | GET    | 할 일 목록 페이징  |
| <a href="https://koreandummyjson.vercel.app/api/posts?page=1&limit=10">/posts?page={page}&limit={limit}</a>       | GET    | 게시물 목록 페이징 |
| <a href="https://koreandummyjson.vercel.app/api/comments?page=1&limit=10">/comments?page={page}&limit={limit}</a> | GET    | 댓글 목록 페이징   |
| <a href="https://koreandummyjson.vercel.app/api/books?page=1&limit=10">/books?page={page}&limit={limit}</a>       | GET    | 책 목록 페이징     |
| <a href="https://koreandummyjson.vercel.app/api/reviews?page=1&limit=10">/reviews?page={page}&limit={limit}</a>   | GET    | 리뷰 목록 페이징   |

<br/>

### 🗜 Filter Endpoints

아래와 같은 필터링 endpoints를 제공합니다.

| Endpoint                                                       | Method | Action             |
| -------------------------------------------------------------- | ------ | ------------------ |
| <a href="https://koreandummyjson.vercel.app/api/todos?userId=1">/todos?userId={userId}</a>       | GET    | 유저별 할 일 목록  |
| <a href="https://koreandummyjson.vercel.app/api/comments?userId=1">/comments?userId={userId}</a> | GET    | 유저별 댓글 목록   |
| <a href="https://koreandummyjson.vercel.app/api/comments?postId=1">/comments?postId={postId}</a> | GET    | 게시물별 댓글 목록 |
| <a href="https://koreandummyjson.vercel.app/api/reviews?bookId=1">/reviews?bookId={bookId}</a>   | GET    | 책별 리뷰 목록     |
| <a href="https://koreandummyjson.vercel.app/api/reviews?userId=1">/reviews?userId={userId}</a>   | GET    | 유저별 리뷰 목록   |

<br/>

### ⛓ Nested Endpoints

아래와 같은 하위 endpoints를 제공합니다.

| Endpoint                                                | Method | Action                  |
| ------------------------------------------------------- | ------ | ----------------------- |
| <a href="https://koreandummyjson.vercel.app/api/users/1/todos">/users/:id/todos</a>       | GET    | 유저별 할 일 목록 조회  |
| <a href="https://koreandummyjson.vercel.app/api/users/1/posts">/users/:id/posts</a>       | GET    | 유저별 게시물 목록 조회 |
| <a href="https://koreandummyjson.vercel.app/api/users/1/comment">/users/:id/comment</a>   | GET    | 유저별 댓글 목록 조회   |
| <a href="https://koreandummyjson.vercel.app/api/users/1/reviews">/users/:id/reviews</a>   | GET    | 유저별 리뷰 목록 조회   |
| <a href="https://koreandummyjson.vercel.app/api/posts/1/comments">/posts/:id/comments</a> | GET    | 게시물별 댓글 목록 조회 |
| <a href="https://koreandummyjson.vercel.app/api/books/1/reviews">/books/:id/reviews</a>   | GET    | 책별 리뷰 목록 조회     |

<br/>

### 📜 All API Endpoints

| Endpoint                                                                                                                   | Method | Action                  |
| -------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------- |
| [/users/:id](https://koreandummyjson.vercel.app/api/users/1)                                                                     | GET    | 유저 조회               |
| [/users](https://koreandummyjson.vercel.app/api/users)                                                                           | GET    | 유저 목록               |
| [/users?page={page}&limit={limit}](https://koreandummyjson.vercel.app/api/users?page=1&limit=10)                                 | GET    | 유저 목록 페이지        |
| [/users/:id/todos](https://koreandummyjson.vercel.app/api/users/1/todos)                                                         | GET    | 유저 할 일 목록 조회    |
| [/users/:id/posts](https://koreandummyjson.vercel.app/api/users/1/posts)                                                         | GET    | 유저 게시물 목록 조회   |
| [/users/:id/comments](https://koreandummyjson.vercel.app/api/users/1/comments)                                                   | GET    | 유저 댓글 목록 조회     |
| [/users/:id/books](https://koreandummyjson.vercel.app/api/users/1/books)                                                         | GET    | 유저 책 목록 조회       |
| [/users/:id/reviews](https://koreandummyjson.vercel.app/api/users/1/reviews)                                                     | GET    | 유저 리뷰 목록 조회     |
| [/users](https://koreandummyjson.vercel.app/api/users)                                                                           | POST   | 유저 생성               |
| [/users/:id](https://koreandummyjson.vercel.app/api/users/1)                                                                     | PUT    | 유저 수정               |
| [/users/:id](https://koreandummyjson.vercel.app/api/users/1)                                                                     | PATCH  | 유저 수정               |
| [/users/:id](https://koreandummyjson.vercel.app/api/users/1)                                                                     | DELETE | 유저 삭제               |
| [/todos/:id](https://koreandummyjson.vercel.app/api/todos/1)                                                                     | GET    | 할 일 조회              |
| [/todos](https://koreandummyjson.vercel.app/api/todos)                                                                           | GET    | 할 일 목록              |
| [/todos?userId={userId}](https://koreandummyjson.vercel.app/api/todos?userId=1)                                                  | GET    | 유저 할 일 목록 필터링  |
| [/todos?page={page}&limit={limit}](https://koreandummyjson.vercel.app/api/todos?page=1&limit=10)                                 | GET    | 할 일 목록 페이지       |
| [/todos](https://koreandummyjson.vercel.app/api/todos)                                                                           | POST   | 할 일 생성              |
| [/todos/:id](https://koreandummyjson.vercel.app/api/todos/1)                                                                     | PUT    | 할 일 수정              |
| [/todos/:id](https://koreandummyjson.vercel.app/api/todos/1)                                                                     | PATCH  | 할 일 수정              |
| [/todos/:id](https://koreandummyjson.vercel.app/api/todos/1)                                                                     | DELETE | 할 일 삭제              |
| [/posts/:id](https://koreandummyjson.vercel.app/api/posts/1)                                                                     | GET    | 게시물 조회             |
| [/posts](https://koreandummyjson.vercel.app/api/posts)                                                                           | GET    | 게시물 목록             |
| [/posts?page={page}&limit={limit}](https://koreandummyjson.vercel.app/api/posts?page=1&limit=10)                                 | GET    | 게시물 목록 페이지      |
| [/posts/:id/comments](https://koreandummyjson.vercel.app/api/posts/1/comments)                                                   | GET    | 게시물 댓글 목록 조회   |
| [/posts?userId={userId}](https://koreandummyjson.vercel.app/api/posts?userId=1)                                                  | GET    | 유저 게시물 목록 필터링 |
| [/posts](https://koreandummyjson.vercel.app/api/posts)                                                                           | POST   | 게시물 생성             |
| [/posts/:id](https://koreandummyjson.vercel.app/api/posts/1)                                                                     | PUT    | 게시물 수정             |
| [/posts/:id](https://koreandummyjson.vercel.app/api/posts/1)                                                                     | PATCH  | 게시물 수정             |
| [/posts/:id](https://koreandummyjson.vercel.app/api/posts/1)                                                                     | DELETE | 게시물 삭제             |
| [/comments/:id](https://koreandummyjson.vercel.app/api/comments/1)                                                               | GET    | 댓글 조회               |
| [/comments](https://koreandummyjson.vercel.app/api/comments)                                                                     | GET    | 댓글 목록               |
| [/comments?page={page}&limit={limit}](https://koreandummyjson.vercel.app/api/comments?page=1&limit=10)                           | GET    | 댓글 목록 페이지        |
| [/comments?userId={userId}](https://koreandummyjson.vercel.app/api/comments?userId=1)                                            | GET    | 유저 댓글 목록 필터링   |
| [/comments?postId={postId}](https://koreandummyjson.vercel.app/api/comments?postId=1)                                            | GET    | 게시물 댓글 목록 필터링 |
| [/comments](https://koreandummyjson.vercel.app/api/comments)                                                                     | POST   | 댓글 생성               |
| [/comments/:id](https://koreandummyjson.vercel.app/api/comments/1)                                                               | PUT    | 댓글 수정               |
| [/comments/:id](https://koreandummyjson.vercel.app/api/comments/1)                                                               | PATCH  | 댓글 수정               |
| [/comments/:id](https://koreandummyjson.vercel.app/api/comments/1)                                                               | DELETE | 댓글 삭제               |
| [/books/:id](https://koreandummyjson.vercel.app/api/books/1)                                                                     | GET    | 책 조회                 |
| [/books](https://koreandummyjson.vercel.app/api/books)                                                                           | GET    | 책 목록                 |
| [/books?page={page}&limit={limit}](https://koreandummyjson.vercel.app/api/books?page=1&limit=10)                                 | GET    | 책 목록 페이지          |
| [/books/:id/reviews](https://koreandummyjson.vercel.app/api/books/1/reviews)                                                     | GET    | 책 리뷰 목록 조회       |
| [/books](https://koreandummyjson.vercel.app/api/books)                                                                           | POST   | 책 생성                 |
| [/books/:id](https://koreandummyjson.vercel.app/api/books/1)                                                                     | PUT    | 책 수정                 |
| [/books/:id](https://koreandummyjson.vercel.app/api/books/1)                                                                     | PATCH  | 책 수정                 |
| [/books/:id](https://koreandummyjson.vercel.app/api/books/1)                                                                     | DELETE | 책 삭제                 |
| [/reviews/:id](https://koreandummyjson.vercel.app/api/reviews/1)                                                                 | GET    | 리뷰 조회               |
| [/reviews](https://koreandummyjson.vercel.app/api/reviews)                                                                       | GET    | 리뷰 목록               |
| [/reviews?page={page}&limit={limit}](https://koreandummyjson.vercel.app/api/reviews?page=1&limit=10)                             | GET    | 리뷰 목록 페이지        |
| [/reviews?userId={userId}](https://koreandummyjson.vercel.app/api/reviews?userId=1)                                              | GET    | 유저 리뷰 필터링        |
| [/reviews?bookId={bookId}](https://koreandummyjson.vercel.app/api/reviews?bookId=1)                                              | GET    | 책 리뷰 필터링          |
| [/reviews](https://koreandummyjson.vercel.app/api/reviews)                                                                       | POST   | 리뷰 생성               |
| [/reviews/:id](https://koreandummyjson.vercel.app/api/reviews/1)                                                                 | PUT    | 리뷰 수정               |
| [/reviews/:id](https://koreandummyjson.vercel.app/api/reviews/1)                                                                 | PATCH  | 리뷰 수정               |
| [/reviews/:id](https://koreandummyjson.vercel.app/api/reviews/1)                                                                 | DELETE | 리뷰 삭제               |
| [/auth/login](https://koreandummyjson.vercel.app/api/auth/login)                                                                 | POST   | 로그인                  |
| [/auth/user](https://koreandummyjson.vercel.app/api/auth/user)                                                                   | GET    | 유저 조회               |
| [/auth/refresh](https://koreandummyjson.vercel.app/api/auth/refresh)                                                             | GET    | 토큰 재발급             |
| [/image?size={size}&bgColor={bgColor}&text={text}&ext={ext}&textColor={textColor}](https://koreandummyjson.vercel.app/api/image) | GET    | 동적 더미 이미지 생성   |
| [/lorem?mode={mode}&count={count}&length={length}](https://koreandummyjson.vercel.app/api/lorem?mode=p&count=2&length=200) | GET |한글 로렘 입숨 생성| 
