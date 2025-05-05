import { type FC, memo, useCallback, useState } from "react";

import Input from "../../Input";
import Modal from "../../Modal";

interface AddTranslationModalProps {
  isOpen: boolean;
  onTranslationAdd: (translation: string) => void;
  onClose: () => void;
}

const AddTranslationModal: FC<AddTranslationModalProps> = ({
  isOpen,
  onTranslationAdd,
  onClose,
}) => {
  const [translation, setTranslation] = useState("");

  const handleClose = useCallback(() => {
    setTranslation("");
    onClose();
  }, [onClose]);

  const handleConfirm = useCallback(() => {
    onTranslationAdd(translation);
    setTranslation("");
    onClose();
  }, [translation, onTranslationAdd, onClose]);

  const handleTranslationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTranslation(e.target.value);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      title="Add translation"
      confirmText="Add"
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <Input placeholder="Enter a translation" onChange={handleTranslationChange} />
    </Modal>
  );
};

export default memo(AddTranslationModal);
