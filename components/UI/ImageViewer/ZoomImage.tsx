"use client";

import React, { useState, useId } from "react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { Tooltip } from "../Tooltip";

interface ZoomProps {
  id?: string;
  children: React.ReactNode;
}

export const ZoomImage: React.FC<ZoomProps> = ({ id, children }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const generatedId = useId();
  const appliedId = id || generatedId;

  const handleZoom = () => {
    setIsZoomed((prevZoom) => !prevZoom);
  };

  return (
    <>
      <div
        key={appliedId}
        onClick={handleZoom}
        className="cursor-zoom-in h-full w-full"
      >
        <Tooltip content="Click to Zoom">
          {children}
        </Tooltip>
      </div>
      <Modal
        size="4xl"
        placement="center"
        backdrop="blur"
        isOpen={isZoomed}
        onClose={handleZoom}
        classNames={{
          base: "bg-transparent",
          backdrop: "cursor-zoom-out",
          closeButton:
            "fixed block top-10 right-12 font-bold text-3xl text-gray bg-zink rounded-full p-2 hover:bg-gray hover:text-zink"
        }}
      >
        <ModalContent>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
