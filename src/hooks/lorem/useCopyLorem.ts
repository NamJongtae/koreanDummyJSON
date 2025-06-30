import { useState } from "react";

export function useCopyLorem(result: string) {
  const [copied, setCopied] = useState<boolean>(false);

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return { copied, handleCopy };
}
