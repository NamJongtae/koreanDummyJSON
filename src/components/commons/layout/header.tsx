import Image from "next/image";
import Link from "next/link";
import Nav from "./nav";

export default function Header() {
  return (
    <header className="fixed z-50 w-full px-5 py-2 shadow-sm backdrop-blur-sm bg-white bg-opacity-20">
      <div className="flex justify-between items-center w-full max-w-[1024px] mx-auto">
        <h1>
          <Link className="flex items-center gap-3" href={"/"}>
            <Image src={"/icons/logo-icon.svg"} width={50} height={50} alt="" />
            <span className="text-xl font-semibold">Korean Dummy JSON</span>
          </Link>
        </h1>
        <Nav />
      </div>
    </header>
  );
}
