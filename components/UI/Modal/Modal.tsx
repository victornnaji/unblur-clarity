import { Modal as PrimitiveModal, ModalContent, ModalBody } from "@nextui-org/react";
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
  size = "3xl",
  classNames,
}: ModalProps) => {
  return (
    <PrimitiveModal
      size={size}
      placement="center"
      backdrop={backdrop}
      isOpen={isOpen}
      // onClose={onClose}
      onOpenChange={onClose}
      radius="none"
      shadow={undefined}
      className="sm:my-0 sm:mx-0"
      classNames={{
        base: "bg-transparent",
        wrapper: "max-h-screen",
        body: "p-0",
        backdrop:
          "cursor-zoom-out bg-gradient-to-t from-gray to-black/70 backdrop-opacity-100",
        closeButton:
          "fixed block top-10 right-4 lg:right-12 font-bold text-3xl text-gray bg-zink rounded-full p-2 hover:bg-gray hover:text-zink",
        ...classNames,
      }}
    >
      <ModalContent>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </PrimitiveModal>
  );
};

export default Modal;
