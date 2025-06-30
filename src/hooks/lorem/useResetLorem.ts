export function useResetLorem(options: {
  mode: "paragraph" | "sentence" | "word";
  resetByMode: (mode: "paragraph" | "sentence" | "word") => void;
  setResult: (val: string) => void;
  setCopied?: (val: boolean) => void;
}) {
  function handleReset() {
    options.resetByMode(options.mode);
    options.setResult("");
    if (options.setCopied) options.setCopied(false);
  }
  return { handleReset };
}
