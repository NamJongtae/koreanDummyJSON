import { useCdnLinks } from "@/src/hooks/home/useCdnLinks";
import CDNLinks from "./cdn-links";
import CDNExampleHtml from "./cdn-example-html";

export default function CDN() {
  const { jsdelivr, unpkg } = useCdnLinks();

  return (
    <>
      <h3 className="section-text font-medium mt-10 mb-2">CDN 사용</h3>
      <CDNLinks jsdelivr={jsdelivr} unpkg={unpkg} />
      <CDNExampleHtml jsdelivr={jsdelivr} />
    </>
  );
}
