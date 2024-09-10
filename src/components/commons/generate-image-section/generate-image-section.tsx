import Image from "next/image";
import CopyBtn from "../../commons/fetch-section/copy-btn";
import CodeSnippet from "../../commons/fetch-section/code-snippet";
import GenerateImageBtn from "../../commons/generate-image-section/generate-image-btn";
import useGenerateImage from "@/src/hooks/commons/useGenerateImage";
import { generateCodeSnippet } from "@/src/lib/generateCodeSnippet";

interface IProps {
  id?: string;
  title: string;
  endpoint?: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, any>;
  body?: Record<string, any>;
  descriptions: React.ReactElement;
  fetchUrl: string;
  className?: string;
  children?: React.ReactNode;
}

export default function GenerateImageSection({
  id,
  title,
  endpoint,
  method,
  headers,
  body,
  descriptions,
  fetchUrl,
  className,
  children
}: IProps) {
  const pathnameArr = fetchUrl.split("/");
  const size = pathnameArr[2] || "150x150";
  console.log(fetchUrl, pathnameArr[2]);
  const [widthStr, heightStr] = size.split("x");
  const width = parseInt(widthStr, 10);
  const height = heightStr ? parseInt(heightStr, 10) : width;

  const code = generateCodeSnippet({
    fetchUrl,
    method,
    body,
    headers,
    isBlob: true
  });

  const { generateImage, handleClickGenerateImage } = useGenerateImage();

  return (
    <section id={id} className={`pt-20 px-6 ${className && className}`}>
      <h2 className="section-title">{title}</h2>

      {endpoint && (
        <p className="section-text mb-2">
          <span className="font-medium">Endpoint</span> : {endpoint}
        </p>
      )}
      {endpoint && (
        <p className="section-text mb-2">
          <span className="font-medium">Method</span> : {method}
        </p>
      )}

      {descriptions}

      <CodeSnippet code={code} />

      <GenerateImageBtn generateImage={handleClickGenerateImage} />

      <CopyBtn target={code} />

      {generateImage && (
        <Image
          className="mt-5"
          src={`/api${fetchUrl}`}
          alt=""
          width={width}
          height={height}
        />
      )}
      {children}
    </section>
  );
}
