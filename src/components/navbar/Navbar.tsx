import Link from "next/link";
import LoginNav from "./LoginNav";

const linkClassName =
  "text-[18px] font-bold hover:bg-neutral-200 rounded-lg p-[8px]";

export default function Navbar() {
  return (
    <nav className="bg-slate-300 bg-opacity-30 w-full h-[60px] flex justify-between items-center px-[20px]">
      <div>
        <Link href="/" className={linkClassName}>
          LEVI
        </Link>
      </div>
      <div>
        <Link href="/chatbot" className={linkClassName}>
          챗봇
        </Link>
      </div>
      <LoginNav />
    </nav>
  );
}
