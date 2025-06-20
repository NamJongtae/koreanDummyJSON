import GenerateImageSection from "../../commons/generate-image-section/generate-image-section";

export default function GetDefaultImage() {
  return (
    <GenerateImageSection
      id="기본-이미지-생성하기"
      title="기본 이미지 생성하기"
      endpoint=""
      method="GET"
      fetchUrl="/image"
      descriptions={
        <>
          <p className="section-text mb-2">
            기본 이미지를 생성합니다. 기본 이미지는 아래와 같은 기본값을
            가집니다.
          </p>

          <ul className="section-text mb-4 list-disc flex flex-col gap-3 ml-10">
            <li>크기 : 150x150 </li>
            <li>
              배경색 :
              <span className="relative before:left-1 before:top-[6px] before:w-4 before:h-4 before:absolute before:bg-[#CCCCCC] before:border pl-6">
                #CCCCCC
              </span>
            </li>
            <li>
              텍스트 색상 :{" "}
              <span className="relative before:left-1 before:top-[6px] before:w-4 before:h-4 before:absolute before:bg-[#000000] before:border pl-6">
                #000000
              </span>{" "}
            </li>
            <li>텍스트 : 150(너비)x150(높이)</li>
            <li>확장자 : PNG</li>
          </ul>
        </>
      }
    />
  );
}
