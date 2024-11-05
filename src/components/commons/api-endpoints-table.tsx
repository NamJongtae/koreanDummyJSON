import Link from "next/link";

interface IProps {
  data: { endpoint: string; url?: string; method: string; action: string }[];
}

export default function ApiEndPointsTable({ data }: IProps) {
  return (
    <table className="w-full border-collapse border border-gray-200 shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-100 text-sm xs:text-base sm:text-lg">
        <tr>
          {["Endpoint", "Method", "Action"].map((header, index) => (
            <th
              key={index}
              className="py-3 px-6 text-left text-md sm:text-lg font-medium text-gray-700 border-b border-gray-200"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white text-xs xs:text-sm sm:text-base break-keep">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-50">
            <td className="py-4 px-6 border-b border-gray-200 break-all">
              <Link
                className="text-blue-600 hover:underline"
                href={row.url ? `/api/${row.url}` : `/api/${row.endpoint}`}
                target="_blank"
                prefetch={false}
              >
                {row.endpoint}
              </Link>
            </td>
            <td className="py-4 px-6 border-b border-gray-200">{row.method}</td>
            <td className="py-4 px-6 border-b border-gray-200">{row.action}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
