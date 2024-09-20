"use client";

import Link from "next/link";
import React, { useCallback, useId } from "react";
import { usePathname, useRouter } from "next/navigation";
import { handleRequest } from "@/utils/auth-helpers/client";
import { SignOut } from "@/utils/auth-helpers/server";
import Button from "@/components/UI/Button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  DropdownSection,
} from "@nextui-org/react";
import {
  User as UserIcon,
  ShoppingCart as ShoppingCartIcon,
  LogOut as LogOutIcon,
  Zap as ZapIcon,
} from "react-feather";
import { shortenFileName } from "@/utils/helpers";
import { UserDto } from "@/types/dtos";

const NavbarLinks = ({
  user,
  credits,
}: {
  user: UserDto | null;
  credits: number;
}) => {
  const avatar_url = user?.avatar_url ?? "";
  const name = user?.full_name ?? "";
  const email = user?.email ?? "";

  const router = useRouter();
  const id = useId();
  const pathname = usePathname();

  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const menus = [
    {
      key: "account",
      text: "Account",
      href: "/account",
      description: email && shortenFileName(email),
      icon: UserIcon,
    },
    {
      key: "unblur",
      text: "Unblur",
      href: "/unblur",
      icon: ZapIcon,
    },
    {
      key: "buy-credit",
      text: "Buy credits",
      href: "/products",
      icon: ShoppingCartIcon,
    },
  ];

  const handleNavigation = useCallback(
    (href: string) => {
      router.push(href);
    },
    [router]
  );

  const prefetchRouter = useCallback(
    (href: string) => {
      router.prefetch(href);
    },
    [router]
  );

  return (
    <>
      {user ? (
        <Dropdown
          placement="bottom-end"
          classNames={{
            content: "py-1 px-1 bg-gray",
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
                divider: "bg-zink opacity-50",
              }}
              aria-label="credits"
            >
              <DropdownItem
                textValue="credits"
                key="credits"
                as={"div"}
                variant="bordered"
              >
                <span className="font-bold text-base text-white">
                  Credits: <span className="text-white">{credits} 💰</span>
                </span>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection
              aria-label="Links"
              showDivider
              classNames={{
                divider: "bg-zink opacity-50",
              }}
            >
              {menus.map(({ key, href, description, icon: Icon, text }) => (
                <DropdownItem
                  key={`${id}-${key}`}
                  as={Link}
                  href={href}
                  onClick={() => handleNavigation(href)}
                  onMouseEnter={() => prefetchRouter(href)}
                  onHoverStart={() => prefetchRouter(href)}
                  description={description && description}
                  startContent={<Icon className={iconClasses} />}
                >
                  {text}
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
                <input type="hidden" name="pathName" value={pathname} />
                <button className="w-full text-start">Sign out</button>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Button href="/signin">Sign in</Button>
      )}
    </>
  );
};

export default NavbarLinks;
