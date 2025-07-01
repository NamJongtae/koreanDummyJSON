"use client";

import useSectionVisibility from "@/src/hooks/commons/useSectionVisibility";
import ResourcesRows from "./resources-rows";
import { RESOURCES_DATA } from "@/src/table-data/resources-data";

export default function Resources() {
  const { ref, isVisible } = useSectionVisibility();

  return (
    <section
      className={`transition-all duration-1000 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-[150px]"
      } mt-20 px-4 mb-20`}
      ref={ref}
    >
      <h2 className="section-title">Resources</h2>

      <p className="section-text mb-5">
        users, posts, comments, todos, books, reviews, auth, image, lorem 9개의
        리소스가 제공됩니다.
      </p>

      <table className="min-w-full border-collapse border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-sm xs:text-base sm:text-lg">
          <tr>
            <th className="py-3 px-6 text-left font-medium text-gray-700 border-b border-gray-200">
              Resource
            </th>
            <th className="py-3 px-6 text-left font-medium text-gray-700 border-b border-gray-200">
              Information
            </th>
          </tr>
        </thead>
        <tbody className="bg-white text-sm sm:text-base break-keep">
          {RESOURCES_DATA.map((row) => (
            <ResourcesRows
              key={row.resource}
              resource={row.resource}
              info={row.info}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}
