"use client";

import LoremHeader from "@/src/components/lorem/lorem-header";
import LoremOptions from "@/src/components/lorem/lorem-options";
import LoremResult from "@/src/components/lorem/lorem-result";
import LoremButtonGroup from "@/src/components/lorem/lorem-button-group";
import { useLoremOptions } from "@/src/hooks/lorem/useLoremOptions";
import { useGenerateLorem } from "@/src/hooks/lorem/useGenerateLorem";

const LoremPage = () => {
  const options = useLoremOptions();
  const { result, setResult, handleGenerate } = useGenerateLorem({
    mode: options.mode,
    count: options.count,
    lengthValue: options.lengthValue
  });

  return (
    <div className="min-h-screen">
      <section className="flex-1 max-w-3xl mx-auto py-16 px-4 w-full">
        <LoremHeader />
        <LoremOptions {...options} />
        <LoremButtonGroup
          result={result}
          mode={options.mode}
          resetByMode={options.resetByMode}
          setResult={setResult}
          onGenerate={handleGenerate}
        />
        <LoremResult result={result} />
      </section>
    </div>
  );
};

export default LoremPage;
