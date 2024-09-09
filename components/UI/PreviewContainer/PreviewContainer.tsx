"use client";

import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import Studio from "./Studio";
import Completed from "./Completed";
import InProgress from "./InProgress";

const PreviewContainer = () => {
  const options = [
    {
      title: "Studio",
      component: <Studio />,
    },
    {
      title: "In Progress",
      component: <InProgress />,
    },
    {
      title: "Completed",
      component: <Completed />,
    },
  ];
  return (
    <div className="w-full border-t-2 border-gray lg:border-none">
      <Tabs
        key="unblur"
        aria-label="Tabs variants"
        radius="none"
        className="w-full mt-4 lg:mt-0"
        variant="bordered"
        classNames={{
          base: "text-zink",
          tab: "w-full",
          tabList: "w-full bg-gray border-2 border-gray",
          tabContent: "text-white font-bold",
          cursor: "w-full bg-purple",
        }}
      >
        {options.map((option) => (
          <Tab key={option.title} title={option.title}>
            <div className="lg:rounded-md shadow-md lg:mt-0 pt-6 lg:p-6 h-auto lg:h-[49rem] lg:border-gray lg:border-2">
              {option.component}
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default PreviewContainer;
