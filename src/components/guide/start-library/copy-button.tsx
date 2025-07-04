interface IProps {
  isCopied: boolean;
  onCopy: () => Promise<void>;
}

export default function CopyButton({ isCopied, onCopy }: IProps) {
  return (
    <button
      className="px-2.5 py-1 text-sm rounded border border-gray-300 bg-white cursor-pointer ml-2"
      onClick={onCopy}
    >
      {isCopied ? "복사됨!" : "복사"}
    </button>
  );
}
