"use client";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import React, { Fragment } from "react";
import { handleRequest } from "@/utils/auth-helpers/client";
import { usePathname, useRouter } from "next/navigation";
import { SignOut } from "@/utils/auth-helpers/server";
import Button from "./Button";

const NavbarLinks = ({ user }: { user: any }) => {
  const { avatar_url, name } = user?.user_metadata || {};
  const router = useRouter();
  return (
    <>
      {user ? (
        <Menu as="div" className="relative ml-3">
          <MenuButton className="relative flex w-8 h-8 text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="sr-only">Open user menu</span>
            <Image
              className="rounded-full"
              referrerPolicy="no-referrer"
              src={avatar_url || ""}
              alt={name || "User"}
              fill
              sizes="h-8 w-8"
            />
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <MenuItem>
                <Link
                  href="/account"
                  className={clsx(
                    "data-[focus]:bg-gray-300",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  {name}
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href={"/products"}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 data-[focus]:bg-gray-300"
                >
                  Buy Tokens
                </Link>
              </MenuItem>
              <MenuItem>
                {/* <button
                  //   onClick={() => supabaseClient.auth.signOut()}
                  type="submit"
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 data-[focus]:bg-gray-300"
                >
                  Sign out
                </button> */}

                <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
                  <input type="hidden" name="pathName" value={usePathname()} />
                  <button className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 data-[focus]:bg-gray-300">
                    Sign out
                  </button>
                </form>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      ) : (
        <Button href="/signin" variant="slim">
          Sign in
        </Button>
      )}
    </>
  );
};

export default NavbarLinks;
