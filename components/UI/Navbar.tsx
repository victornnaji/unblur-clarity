import { getServerUser } from "@/utils/auth-helpers/server";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import unblurLogo from "@/assets/unblur-photos.png";
import NavbarLinks from "./NavbarLinks";

const Navbar = async () => {
  const user = await getServerUser();
  return (
    <header className="flex items-center justify-between py-6">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <Link href="/" className="relative w-24 text-4xl font-bold h-9">
        <Image
          src={unblurLogo}
          alt="unblur photo logo"
          fill
          priority
          sizes="h-auto w-auto"
          style={{ objectFit: "contain" }}
        />
      </Link>
      <div className="flex items-center">
        <nav className="relative ml-3">
          <NavbarLinks user={user} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
