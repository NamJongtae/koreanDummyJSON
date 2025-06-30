import React from "react";

interface IProps {
  result: string;
}

const LoremResult = ({ result }: IProps) => (
  <section className="mt-6">
    <div className="bg-white border rounded-lg p-4 min-h-[80px]  h-[340px] md:h-[400px] md:max-h-[50vh] overflow-auto whitespace-pre-line text-gray-800">
      {result || (
        <span className="text-gray-400">
          옵션을 선택하고 생성 버튼을 눌러주세요.
        </span>
      )}
    </div>
  </section>
);

export default LoremResult;
