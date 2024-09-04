"use client";

import { useSectionVisibility } from "@/src/hooks/commons/useSectionVisibility";
import ApiEndPointsTable from "../../commons/api-endpoints-table";
import { API_ENDPOINT_DATA } from "@/src/table-data/api-endpoints-data";

export default function ApiEndpoints() {
  const { ref, isVisible } = useSectionVisibility();

  return (
    <section
      className={`transition-all duration-1000 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-[150px]"
      } my-20 px-4`}
      ref={ref}
    >
      <h2 className="section-title">API Endpoints</h2>
      <ApiEndPointsTable data={API_ENDPOINT_DATA} />
    </section>
  );
}
