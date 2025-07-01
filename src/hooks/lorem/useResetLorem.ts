export default function useResetLorem(options: {
  mode: "paragraph" | "sentence" | "word";
  resetByMode: (mode: "paragraph" | "sentence" | "word") => void;
  setResult: (val: string) => void;
}) {
  function handleReset() {
    options.resetByMode(options.mode);
    options.setResult("");
  }
  return { handleReset };
}
