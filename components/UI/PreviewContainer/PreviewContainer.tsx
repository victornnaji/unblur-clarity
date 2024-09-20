"use client";

import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const PreviewContainer = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const options = [
    {
      title: "Studio",
      key: "studio",
      href: "/unblur/studio",
    },
    {
      title: "In Progress",
      key: "in-progress",
      href: "/unblur/in-progress",
    },
    {
      title: "Completed",
      key: "completed",
      href: "/unblur/completed",
    },
  ];
  return (
    <div className="w-full border-t-2 border-gray lg:border-none">
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
          tabContent: "text-white font-bold hover:text-purple",
          cursor: "w-full bg-purple",
        }}
      >
        {(item) => (
          <Tab
            as={Link}
            key={item.href}
            title={item.title}
            href={item.href}
            className={clsx(
              item.key === "in-progress" &&
                "before:content-[''] before:absolute before:left-0 before:top-[10%] before:w-px before:h-[80%] before:bg-white/20 after:content-[''] after:absolute after:right-0 after:top-[10%] after:w-px after:h-[80%] after:bg-white/20"
            )}
          >
            <div className="lg:rounded-md shadow-md lg:mt-0 pt-6 lg:p-6 h-auto lg:h-[49rem] lg:border-gray lg:border-2">
              {children}
            </div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default PreviewContainer;
