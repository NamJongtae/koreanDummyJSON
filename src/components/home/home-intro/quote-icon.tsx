import Image from "next/image";

interface IProps {
  position: "top" | "bottom";
}

export default function QuoteIcon({ position }: IProps) {
  const ImageStyle = `${position === "top" ? "left-3 -top-4 sm:-top-5 lg:-top-6" : "right-3 -bottom-4 sm:-bottom-5 lg:-bottom-6"} absolute bg-white w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] lg:w-[50px] lg:h-[50px]`;

  return (
    <Image
      className={ImageStyle}
      src="/icons/double-quotes-left-icon.svg"
      alt='"'
      width="50"
      height="50"
    />
  );
}
