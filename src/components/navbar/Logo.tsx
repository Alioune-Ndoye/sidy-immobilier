import Link from "next/link";
import { MdOutlineHomeWork } from "react-icons/md";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <MdOutlineHomeWork className="text-primary" size={32} />
      <span className="hidden sm:block text-xl font-bold text-primary tracking-tight">
        Sidy&nbsp;Immobilier
      </span>
    </Link>
  );
}
