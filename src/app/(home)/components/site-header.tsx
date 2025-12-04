import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-center">
      <Link href="/" className="flex items-center gap-2 group">
        <Image
          src="/trustdb-logomark.svg"
          alt="TrustdB"
          width={150}
          height={150}
          className="w-24 h-auto sm:w-32 md:w-36"
        />
      </Link>
    </header>
  );
}
