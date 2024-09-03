import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full text-center py-4 bg-gray-100">
      <span className="text-sm text-gray-500">
        © 2024 Korean Dummy JSON. All Rights Reserved.
      </span>
      <p className="text-sm text-gray-500 mt-1">
        Post Images from{" "}
        <Link
          className="text-blue-600 betterhover:hover:underline"
          href={"https://picsum.photos/"}
        >
          Lorem Picsum
        </Link>
      </p>
    </div>
  );
}
