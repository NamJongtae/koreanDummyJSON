interface IProps {
  isLoading: boolean;
}

function LoadingIndicator({ isLoading }: IProps) {
  if (!isLoading) return null;
  return (
    <div className="absolute inset-0 z-10">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        Loading...
      </div>
    </div>
  );
}

export default LoadingIndicator;
