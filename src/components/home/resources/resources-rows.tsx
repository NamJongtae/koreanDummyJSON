import Link from "next/link";
import React from "react";

interface IProps {
  resource: string;
  info: string;
}
export default function ResourcesRows({ resource, info }: IProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-4 px-6 border-b border-gray-200">
        <Link
          href={`/api${resource}`}
          className="text-blue-600 hover:underline"
        >
          {resource}
        </Link>
      </td>
      <td className="py-4 px-6 border-b border-gray-200">{info}</td>
    </tr>
  );
}
