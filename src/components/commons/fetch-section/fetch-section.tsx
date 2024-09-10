"use client";

import CodeSnippet from "./code-snippet";
import FetchButton from "./fetch-button";
import CopyBtn from "./copy-btn";
import FetchResult from "./fetch-result";
import useFetch from "@/src/hooks/commons/useFetch";
import { generateCodeSnippet } from "@/src/lib/generateCodeSnippet";

interface IProps {
  sectionRef?: React.Ref<HTMLDivElement>;
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

export default function FetchSection({
  sectionRef,
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
  const { data, fetchData, isLoading } = useFetch();

  const code = generateCodeSnippet({ fetchUrl, method, body, headers });

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`pt-20 px-6 ${className && className}`}
    >
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

      <FetchButton
        fetchData={() => fetchData(`/api${fetchUrl}`, method, body, headers)}
      />

      <CopyBtn target={code} />

      <FetchResult data={data} isLoading={isLoading} />

      {children}
    </section>
  );
}
