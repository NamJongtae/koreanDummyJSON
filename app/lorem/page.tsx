import LoremPage from "@/src/components/lorem/lorem-page";

export const metadata = {
  title: "한글 Lorem Ipsum 생성기 | Korean Dummy JSON",
  description: "한국어 더미 텍스트(문단, 문장, 단어)를 쉽고 빠르게 생성하세요.",
  keywords: [
    "한글 더미 텍스트",
    "Lorem Ipsum",
    "Korean Dummy JSON",
    "한글 로렘",
    "한글 입숨",
    "로렘 입숨",
    "더미 데이터",
    "한국어 Lorem Ipsum"
  ],
  openGraph: {
    url: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
    title: "한글 Lorem Ipsum 생성기 | Korean Dummy JSON",
    description:
      "한국어 더미 텍스트(문단, 문장, 단어)를 쉽고 빠르게 생성하세요.",
    images: {
      url: "/images/og-img.jpg",
      width: 1200,
      height: 630,
      alt: "Korean Dummy JSON"
    },
    siteName: "Korean Dummy JSON",
    type: "website"
  }
};

export default function Page() {
  return <LoremPage />;
}
