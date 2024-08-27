"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  DropdownSection
} from "@nextui-org/react";

import Link from "next/link";
import React, { useId } from "react";
import { handleRequest } from "@/utils/auth-helpers/client";
import { usePathname, useRouter } from "next/navigation";
import { SignOut } from "@/utils/auth-helpers/server";
import Button from "./Button";
import {
  User as UserIcon,
  ShoppingCart as ShoppingCartIcon,
  LogOut as LogOutIcon,
  Zap as ZapIcon
} from "react-feather";
import { shortenFileName } from "@/utils/helpers";

const NavbarLinks = ({ user }: { user: any }) => {
  const { avatar_url, name, email } = user?.user_metadata || {};
  const router = useRouter();
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const id = useId();
  const menus = [
    {
      key: "account",
      text: "Account",
      href: "/",
      description: shortenFileName(email),
      icon: <UserIcon className={iconClasses} />
    },
    {
      key: "unblur",
      text: "Unblur",
      href: "/unblur",
      icon: <ZapIcon className={iconClasses} />
    },
    {
      key: "buy-credit",
      text: "Buy credits",
      href: "/products",
      icon: <ShoppingCartIcon className={iconClasses} />
    }
  ];

  return (
    <>
      {user ? (
        <Dropdown
          placement="bottom-end"
          classNames={{
            content: "py-1 px-1 bg-gray"
          }}
        >
          <DropdownTrigger>
            <Avatar
              as="button"
              src={avatar_url}
              className="transition-transform"
              name={name}
            />
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Navigation"
            disabledKeys={["credits"]}
          >
            <DropdownSection
              showDivider
              classNames={{
                divider: "bg-zink opacity-50"
              }}
              aria-label="credits"
            >
              <DropdownItem
                textValue="credits"
                key="credits"
                as={"div"}
                variant="bordered"
              >
                <span className="text-bold text-base text-foreground">
                  Credits: 0
                </span>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection
              aria-label="Links"
              showDivider
              classNames={{
                divider: "bg-zink opacity-50"
              }}
            >
              {menus.map((menu) => (
                <DropdownItem
                  key={`${id}-${menu.key}`}
                  as={Link}
                  href={menu.href}
                  onClick={() => router.push(menu.href)}
                  description={menu.description && menu.description}
                  startContent={menu.icon}
                >
                  {menu.text}
                </DropdownItem>
              ))}
            </DropdownSection>
            <DropdownSection aria-label="sign out">
              <DropdownItem
                key="sign out"
                color="danger"
                className="w-full"
                as="form"
                onSubmit={(e) =>
                  handleRequest(
                    e as unknown as React.FormEvent<HTMLFormElement>,
                    SignOut,
                    router
                  )
                }
                textValue="Sign out"
                startContent={<LogOutIcon className={iconClasses} />}
              >
                <input type="hidden" name="pathName" value={usePathname()} />
                <button className="w-full text-start">Sign out</button>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Button href="/signin" variant="slim">
          Sign in
        </Button>
      )}
    </>
  );
};

export default NavbarLinks;
