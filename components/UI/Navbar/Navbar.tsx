import React from "react";
import NavbarLinks from "./NavbarLinks";
import { getUser } from "@/utils/supabase/actions";
import BrandLogo from "@/components/Icons/BrandLogo";
import { Navbar as NextUINavbar } from "@nextui-org/react";

const Navbar = async () => {
  const user = await getUser();
  return (
    <NextUINavbar
      classNames={{
        wrapper: "max-w-full flex lg:layout-grid lg:grid-rows-1"
      }}
      shouldHideOnScroll
      isBordered
      className="flex items-center w-full justify-evenly h-20 lg:h-32 layout-grid-full top-0"
    >
      <div className="flex w-full justify-between items-center">
        <a href="#skip" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <BrandLogo />
        <div className="flex items-center">
          <nav className="relative ml-3">
            <NavbarLinks user={user} />
          </nav>
        </div>
      </div>
    </NextUINavbar>
  );
};

export default Navbar;
