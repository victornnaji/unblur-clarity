import { Modal as PrimitiveModal, ModalContent } from "@nextui-org/react";
import React from "react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
  onClose: () => void;
  backdrop?: "blur" | "transparent";
  classNames?: {
    base?: string;
    backdrop?: string;
    closeButton?: string;
  };
}
const Modal = ({
  children,
  isOpen,
  onClose,
  backdrop = "blur",
  size = "4xl",
  classNames
}: ModalProps) => {
  return (
    <PrimitiveModal
      size={size}
      placement="center"
      backdrop={backdrop}
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        base: "bg-transparent cursor-zoom-out",
        backdrop: "cursor-pointer",
        closeButton:
          "fixed block top-10 right-12 font-bold text-3xl text-gray bg-zink rounded-full p-2 hover:bg-gray hover:text-zink",
        ...classNames
      }}
    >
      <ModalContent>{children}</ModalContent>
    </PrimitiveModal>
  );
};

export default Modal;
