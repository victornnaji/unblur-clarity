"use client";

import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { links } from "@/config";

const PreviewContainer = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const options = [
    {
      title: links.studio.label,
      key: links.studio.key,
      href: links.studio.path
    },
    {
      title: links.studioInProgress.label,
      key: links.studioInProgress.key,
      href: links.studioInProgress.path
    },
    {
      title: links.studioCompleted.label,
      key: links.studioCompleted.key,
      href: links.studioCompleted.path
    }
  ];
  return (
    <div className="w-full border-y-2 border-gray lg:border-none min-h-40">
      <Tabs
        aria-label="Unblur Previews"
        radius="none"
        className="w-full mt-4 lg:mt-0"
        variant="bordered"
        selectedKey={pathname}
        items={options}
        classNames={{
          base: "text-zink",
          tab: "w-full",
          tabList: "w-full bg-gray border-2 border-gray",
          tabContent: "text-white font-bold",
          cursor: "w-full bg-gradient",
        }}
      >
        {(item) => (
          <Tab
            as={Link}
            key={item.href}
            title={item.title}
            href={item.href}
            data-focus-visible={false}
            className={clsx(item.key === "in-progress" && "divider")}
          >
            <div className="lg:rounded-md shadow-md lg:mt-0 pt-3 lg:p-6 h-auto lg:h-[49rem] lg:border-gray lg:border-2 mb-8 lg:mb-0">
              {children}
            </div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default PreviewContainer;
