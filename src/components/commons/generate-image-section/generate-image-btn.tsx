interface IProps {
  generateImage: () => void;
}

export default function GenerateImageBtn({ generateImage }: IProps) {
  return (
    <button
      className="primary-btn mr-3 bg-black text-white betterhover:hover:bg-gray-600"
      onClick={generateImage}
    >
      이미지 생성
    </button>
  );
}
