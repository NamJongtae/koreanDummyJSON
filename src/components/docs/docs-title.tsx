"use client";

import { usePathname } from "next/navigation";

export default function DocsTitle() {
  const pathname = usePathname();
  const docName = pathname.replace("/docs/", "");
  const title = docName.charAt(0).toUpperCase() + docName.slice(1);

  return <h2 className="docs-title">📃 {title} Docs</h2>;
}
