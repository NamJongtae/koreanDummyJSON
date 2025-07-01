import { useState } from "react";

export default function useCopy({
  target,
  timer
}: {
  target: string;
  timer: number;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (isCopied) return;
      await navigator.clipboard.writeText(target);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), timer);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return { isCopied, handleCopy };
}
