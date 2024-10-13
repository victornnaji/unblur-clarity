"use client";

import React, { useState, useId } from "react";
import Modal from "@/components/UI/Modal";
import Card from "../Studio/Card";
import { IconButton } from "../Button";
import { Maximize2 } from "react-feather";

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
      <Card
        key={appliedId}
        header={
          <IconButton
            Icon={Maximize2}
            onClick={handleZoom}
            aria-label="Expand"
          />
        }
      >
        {children}
      </Card>
      <Modal isOpen={isZoomed} onClose={handleZoom}>
        {children}
      </Modal>
    </>
  );
};
