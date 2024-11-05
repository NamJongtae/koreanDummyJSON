import GenerateImageSection from "../../commons/generate-image-section/generate-image-section";

export default function GetCustomBgColorImage() {
  return (
    <GenerateImageSection
      id="이미지-배경-색상-커스텀하기"
      title="이미지 배경 색상 커스텀하기"
      endpoint="/image/:size/:bgColor"
      method="GET"
      fetchUrl="/image/300/2E64FE"
      descriptions={
        <>
          <p className="section-text mb-2">
            배경 색상은 HEX 코드로 설정할 수 있습니다.
          </p>

          <p className="section-text mb-2">
            배경 색상의 기본값은{" "}
            <span className="font-medium relative before:left-1 before:top-[6px] before:w-4 before:h-4 before:absolute before:bg-[#CCCCCC] before:border pl-6">
              #CCCCCC
            </span>
            입니다.
          </p>

          <p className="section-text mb-2">
            배경 색상이{" "}
            <span className="font-medium relative before:left-1 before:top-[6px] before:w-4 before:h-4 before:absolute before:bg-[#2E64FE] before:border pl-6">
              #2E64FE
            </span>
            인 이미지를 생성합니다.
          </p>

          <p className="section-text mb-4">
            아래 Fetch URL를 복사하여 브라우저 주소창에 URL를 붙여넣고, 배경
            색상 값을 직접 변경해보세요.
          </p>
        </>
      }
    />
  );
}
