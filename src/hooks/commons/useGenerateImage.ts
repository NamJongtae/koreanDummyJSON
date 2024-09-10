import { useState } from "react";

export default function useGenerateImage() {
  const [generateImage, setGenerateImage] = useState(false);

  const handleClickGenerateImage = () => {
    setGenerateImage(true);
  };

  return { generateImage, handleClickGenerateImage };
}
