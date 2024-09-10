"use client";

import useCopy from "@/src/hooks/commons/useCopy";
import React from "react";

interface IProps {
  target: string;
}

export default function CopyBtn({ target }: IProps) {
  const { isCopied, handleCopy } = useCopy(target);

  return (
    <button
      onClick={handleCopy}
      className={`primary-btn bg-blue-500 text-white betterhover:hover:bg-blue-400 ${isCopied ? "animate-buttonCopyAnimation" : ""}`}
    >
      {isCopied ? "복사 완료" : "코드 복사"}
    </button>
  );
}
