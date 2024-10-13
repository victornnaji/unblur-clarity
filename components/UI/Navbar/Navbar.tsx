import React from "react";
import NavbarLinks from "./NavbarLinks";
import { getUser } from "@/utils/supabase/actions";
import BrandLogo from "@/components/Icons/BrandLogo";

const Navbar = async () => {
  const user = await getUser();
  return (
    <header className="flex items-center justify-between h-20 lg:h-36">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <BrandLogo />
      <div className="flex items-center">
        <nav className="relative ml-3">
          <NavbarLinks user={user} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
