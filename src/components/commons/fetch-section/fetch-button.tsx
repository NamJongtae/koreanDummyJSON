interface IProps {
  fetchData: () => void;
}

function FetchButton({ fetchData }: IProps) {
  return (
    <button
      onClick={fetchData}
      className="primary-btn mr-3 bg-black text-white betterhover:hover:bg-gray-600"
    >
      코드 실행
    </button>
  );
}

export default FetchButton;
