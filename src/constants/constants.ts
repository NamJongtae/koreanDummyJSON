import { Metadata } from "next";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export const DOCS_MENU = [
  "Users",
  "Todos",
  "Posts",
  "Comments",
  "Books",
  "Reviews",
  "Auth",
  "Image",
  "Lorem"
];

export const BASE_METADATA: Metadata = {
  title: "Korean Dummy JSON | 한글 더미 데이터 API",
  metadataBase: new URL(BASE_URL),
  description: `한국어로 구성된 데이터를 통해 개발자들이 보다 현실적인 더미 데이터를 제공 받을 수 있습니다.
  GET, POST, PUT, PATCH, DELETE 요청을 보내고 직접 테스트 해보고 학습해보세요. 또한, 한글 로렘 입숨 생성 기능을 통해 다양한 형태의 한글 더미 텍스트도 쉽게 생성할 수 있습니다.`,
  keywords: [
    "korean JSON",
    "placeholder json",
    "korean placeholder json",
    "dummy json",
    "korean dummy json",
    "한글 더미 데이터",
    "한국어 더미 데이터",
    "더미 데이터",
    "API 테스트",
    "lorem",
    "korean lorem Ipsum",
    "한글 로렘",
    "한글 로렘 입숨",
    "한글 입숨",
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
  ],
  verification: {
    google: "c6hLQ83ILZIlJb0fwdyrw71DGHnTFaI7hmmORy7fpk0",
    other: {
      "naver-site-verification": "af430635bea7730cf8fad862d82246d2e48a1e42"
    }
  },
  icons: {
    icon: "/icons/logo-icon.svg"
  },
  openGraph: {
    url: new URL(BASE_URL),
    title: "Korean Dummy JSON - 한글 로렘 생성기, 한글 더미 데이터 API",
    description: `한국어로 구성된 데이터를 통해 개발자들이 보다 현실적인 더미 데이터를 제공 받을 수 있습니다.
    GET, POST, PUT, PATCH, DELETE 요청을 보내고 직접 테스트 해보고 학습해보세요. 또한, 한글 로렘 입숨 생성 기능을 통해 다양한 형태의 한글 더미 텍스트도 쉽게 생성할 수 있습니다.`,
    images: {
      url: "/images/og-img.jpg",
      width: 1200,
      height: 630,
      alt: "Korean Dummy JSON"
    },
    siteName: "Korean Dummy JSON",
    locale: "ko-KR",
    type: "website"
  }
};
