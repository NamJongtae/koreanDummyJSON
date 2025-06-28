import Image from "next/image";
import Link from "next/link";

export default function HomeIntroLinks() {
  return (
    <div className="flex flex-col gap-2 items-start">
      <Link
        href={"https://github.com/NamJongtae/korean_dummy_JSON"}
        className="inline-flex items-center gap-2 rounded-full border px-2 sm:px-3 py-2 transition-colors betterhover:hover:bg-gray-100"
      >
        <Image src={"/icons/github-icon.svg"} alt="" width={32} height={32} />
        GitHub
      </Link>
      <Link
        href={"https://www.npmjs.com/package/korean-dummy-json-fetcher"}
        className="inline-flex items-center gap-2 rounded-full border px-2 sm:px-3 py-2 transition-colors betterhover:hover:bg-gray-100"
      >
        <Image src={"/icons/npm-icon.svg"} alt="" width={26} height={26} />
        Korean Dummy JSON Fetcher
      </Link>
    </div>
  );
}
