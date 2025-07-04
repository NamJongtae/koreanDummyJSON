"use client";

import ApiEndPointsTable from "../../commons/api-endpoints-table";
import { API_ENDPOINT_DATA } from "@/src/table-data/api-endpoints-data";

export default function ApiEndpoints() {
  return (
    <section id="API-Endpoints" className={" py-20 px-4"}>
      <h2 className="section-title">API Endpoints</h2>
      <ApiEndPointsTable data={API_ENDPOINT_DATA} />
    </section>
  );
}
