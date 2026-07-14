import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/nazir-mark.png"
        alt="Nazir Group"
        width={44}
        height={38}
        priority
      />
      <span className="hidden sm:block text-xl font-bold text-primary tracking-tight">
        Nazir&nbsp;Group
      </span>
    </Link>
  );
}
