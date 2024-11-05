import GenerateImageSection from "../../commons/generate-image-section/generate-image-section";

export default function GetCustomSizeImage() {
  return (
    <GenerateImageSection
      id="이미지-사이즈-커스텀하기"
      title="이미지 사이즈 커스텀하기"
      endpoint="/image/:size"
      method="GET"
      fetchUrl="/image/300"
      descriptions={
        <>
          <p className="section-text mb-2">
            사이즈 값은{" "}
            <span className="font-medium">단일 size(너비=높이) </span>
            혹은 <span className="font-medium">너비x높이</span>로 설정가능하며,
            기본값은
            <span className="font-medium"> 150x150</span>입니다.
          </p>
          <p className="section-text mb-2">
            만약, 사이즈가 너비가 500 높이가 300인 이미지를 생성하려면 500x300를
            size 값으로 설정하면됩니다.
          </p>
          <p className="section-text mb-2">
            사이즈가 300x300인 이미지를 생성합니다.
          </p>
          <p className="section-text mb-4">
            아래 Fetch URL를 복사하여 브라우저 주소창에 URL를 붙여넣고, size
            값을 직접 변경해보세요.
          </p>
        </>
      }
    />
  );
}
