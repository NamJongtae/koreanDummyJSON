import GenerateImageSection from '../../commons/generate-image-section/generate-image-section';

export default function GetCustomExtImage() {

  return (
    <GenerateImageSection
      id="이미지-확장자-커스텀하기"
      title="이미지 확장자 커스텀하기"
      endpoint="/image/:size/:bgColor/:text.{ext}"
      method="GET"
      fetchUrl="/image/300/2E64FE/KoreanDummyJSON.jpg"
      descriptions={
        <>
          <p className="section-text mb-2">
            확장자의 기본값은 <span className="font-medium">.png</span>입니다.
          </p>

          <p className="section-text mb-2">
            지원하는 확장자는
            <span className="font-medium">.jpge, .jpg, .png, .svg</span>입니다.
          </p>

          <p className="section-text mb-2">
            확장자가 <span className="font-medium">.jpg</span>인 이미지를
            생성합니다.
          </p>

          <p className="section-text mb-4">
            아래 Fetch URL를 복사하여 브라우저 주소창에 URL를 붙여넣고, 이미지
            확장자 값을 직접 변경해보세요.
          </p>
        </>
      }
    />
  );
}
