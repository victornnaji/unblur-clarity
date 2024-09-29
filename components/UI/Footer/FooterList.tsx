import { clsx } from "@/utils/clsx";
import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/listbox";

const FooterList = ({
  title,
  items,
  className
}: {
  title: string;
  items: { href: string; label: string }[];
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "flex flex-col sm:gap-4 gap-2 lg:gap-6 sm:h-full",
        className
      )}
    >
      <h3 className="text-lg font-bold px-2">{title}</h3>
      <Listbox
        as="ul"
        aria-label={title ? title : "Footer List"}
        classNames={{
          base: "h-full",
          list: "h-full w-[fit-content] gap-2"
        }}
      >
        {items.map((item) => (
          <ListboxItem key={item.href} href={item.href} className="py-0">
            {item.label}
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
};

export default FooterList;
