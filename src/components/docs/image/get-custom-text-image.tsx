import GenerateImageSection from "../../commons/generate-image-section/generate-image-section";

export default function GetCustomTextImage() {
  return (
    <GenerateImageSection
      id="이미지-텍스트-커스텀하기"
      title="이미지 텍스트 커스텀하기"
      endpoint="/image/:size/:bgColor/:text"
      method="GET"
      fetchUrl="/image/300/2E64FE/KoreanDummyJSON"
      descriptions={
        <>
          <p className="section-text mb-2">
            텍스트의 기본값은 size로 설정했던{" "}
            <span className="font-medium">너비x높이</span> 값입니다.
          </p>

          <p className="section-text mb-2">
            텍스트가 <span className="font-medium">korean dummy JSON</span>인
            이미지를 생성합니다.
          </p>

          <p className="section-text mb-4">
            아래 Fetch URL를 복사하여 브라우저 주소창에 URL를 붙여넣고, 이미지
            텍스트 값을 직접 변경해보세요.
          </p>
        </>
      }
    />
  );
}
