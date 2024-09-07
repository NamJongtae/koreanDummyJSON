"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IProps {
  error: Error;
}

export default function Error({ error }: IProps) {
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  return (
    <div className="bg-gray-200 w-full px-16 md:px-0 h-screen flex items-center justify-center">
      <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
        <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">
          Error
        </p>
        <p className="text-gray-500 mt-4 pb-4 text-center leading-7">
          {error.message ? (
            error.message
          ) : (
            <>
              죄송합니다. <br />
              알 수 없는 에러가 발생하였습니다. <br />
              잠시 후 다시 시도해주세요.
            </>
          )}
        </p>
        <button
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-4 rounded transition duration-150"
          title="Return Home"
          onClick={handleClickBack}
        >
          <Image
            src={"/icons/back-icon.svg"}
            alt={"이전 페이지"}
            width={20}
            height={20}
          />
          <span>이전 페이지</span>
        </button>
      </div>
    </div>
  );
}
