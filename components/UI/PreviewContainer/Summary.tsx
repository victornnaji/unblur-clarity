import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import React from "react";

const Summary = () => {
  return (
    <div className="text-sm text-left text-zink lg:mt-2">
      <span>Restoration time: 50ms</span>
      <div className="text-purple relative cursor-pointer">
        <Popover placement="top" color="foreground" showArrow={true}>
          <PopoverTrigger className="">
            <div className="inline-block">View logs</div>
          </PopoverTrigger>
          <PopoverContent className="bg-gray text-zink border border-zink">
            <div className="px-1 py-2">
              <div className="text-small font-bold text-md">
                Popover Content
              </div>
              <div className="flex flex-col">
                <span>Restoration time: 50ms</span>
                <span>Model: RayClever</span>
                <span>Version: 1.0</span>
                <span>Author: Ray</span>
                <span>Created at: 2021-10-01</span>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Summary;
