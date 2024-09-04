import { useState } from "react";

export default function useCopy(target: string) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (isCopied) return;
      await navigator.clipboard.writeText(target);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return { isCopied, handleCopy };
}
