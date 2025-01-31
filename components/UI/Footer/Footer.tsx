"use client";

import { Card, Spacer } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";
import BrandLogo from "@/components/Icons/BrandLogo";
import FooterList from "./FooterList";
import CustomLink from "@/components/UI/CustomLink";
import { FooterLinks, links } from "@/config";

const Footer = () => {
  const pathname = usePathname();
  if (pathname.includes(links.studio.path)) return null;

  return (
    <>
      <Card
        as="footer"
        radius="sm"
        className="w-full h-full bg-gray border-1 p-4 mb-6 mt-6"
      >
        <div className="flex flex-col sm:flex-row size-full sm:gap-4 gap-6">
          <div className="brand flex flex-col lg:justify-between">
            <BrandLogo />
            <div className="text-darkzink">
              <CustomLink
                className="hover:text-zink cursor-pointer lg:px-2 px-0"
                href="mailto:hi@unblur.photos"
                showAnchorIcon={true}
              >
                hi@unblur.photos
              </CustomLink>
            </div>
          </div>
          <div className="navigation grid grid-cols-2 md:grid-cols-6 size-full sm:gap-4 gap-8">
            <FooterList
              className="md:col-start-2 md:col-span-2"
              title="Links"
              items={[
                { href: links.products.path, label: "Pricing" },
                {
                  href: FooterLinks.billing.path,
                  label: FooterLinks.billing.label
                },
                {
                  href: FooterLinks.login.path,
                  label: FooterLinks.login.label
                }
              ]}
            />
            <FooterList
              className="md:col-start-4 md:col-span-2"
              title="Resources"
              items={[
                {
                  href: "#",
                  label: FooterLinks.contact.label
                },
                {
                  href: FooterLinks.Privacy.path,
                  label: FooterLinks.Privacy.label
                },
                {
                  href: "##",
                  label: ""
                }
              ]}
            />
          </div>
        </div>
      </Card>
      <Spacer y={10} />
    </>
  );
};

export default Footer;
