import Link from "next/link";

import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#e4e4e4] flex items-center border-t border-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        <div className="space-y-4 flex flex-col items-center">
          <Image
            src="/trustdb-logomark.svg"
            alt="TrustdB"
            width={128}
            height={80}
          />

          <ul className="space-y-2">
            <li className="flex items-center gap-1.5 justify-center">
              <span className="text-xs text-muted-foreground">Built by</span>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Image
                  src="/madeby_don.png"
                  alt="Madeby_Don"
                  width={16}
                  height={16}
                  className="rounded-full"
                />
                Madeby_Don
              </Link>
            </li>
          </ul>
        </div>

        {/* Bottom Section */}
        <div className=" pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-xs text-muted-foreground">© 2025</p>
          <p className="text-xs text-muted-foreground text-center">
            ALL RIGHTS RESERVED BY TRUSTDB.
          </p>
        </div>
      </div>
    </footer>
  );
}
