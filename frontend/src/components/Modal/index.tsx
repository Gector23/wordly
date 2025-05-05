import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { type FC, memo } from "react";

import Button from "../Button";

interface ModalProps {
  isOpen: boolean;
  title: string;
  confirmText?: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  title,
  confirmText,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-lg space-y-4 border bg-white p-4">
          <DialogTitle className="font-bold">{title}</DialogTitle>
          <div>{children}</div>
          <div className="flex gap-4">
            <Button fullWidth onClick={onClose}>
              Cancel
            </Button>
            <Button fullWidth onClick={onConfirm}>
              {confirmText ?? "Confirm"}
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default memo(Modal);
