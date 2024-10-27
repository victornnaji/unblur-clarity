import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";
import Button from "../Button";

interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  isOpen: boolean;
  header?: string;
}

const ConfirmModal = ({
  children,
  onConfirm,
  onCancel,
  isOpen,
  onClose,
  header
}: ConfirmModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  return (
    <Modal
      classNames={{
        base: "bg-gray border"
      }}
      placement="center"
      isOpen={isOpen}
      onOpenChange={onClose}
    >
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button
            plain
            onClick={handleConfirm}
            variant="light"
            className="!bg-transparent !capitalize !text-zink"
          >
            Confirm
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
