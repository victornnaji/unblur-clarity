import React from "react";
import NavbarLinks from "./NavbarLinks";
import { getUserCredits, getUser } from "@/utils/supabase/actions";
import BrandLogo from "@/components/Icons/BrandLogo";

const Navbar = async () => {
  const [user, credits] = await Promise.all([getUser(), getUserCredits()]);
  return (
    <header className="flex items-center justify-between h-20 md:h-36">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <BrandLogo />
      <div className="flex items-center">
        <nav className="relative ml-3">
          <NavbarLinks user={user} credits={credits ?? 0} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
