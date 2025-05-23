import { memo, useCallback, useState } from "react";

import { useAppSelector } from "../../hooks/useAppSelector";
import Button from "../Button";
import AddTranslationModal from "./AddTranslationModal";
import { useAddTranslationMutation } from "../../api/endpoints/wordEndpoints";

const Translations = () => {
  const [isAddTranslationModalOpen, setIsAddTranslationModalOpen] = useState(false);
  const [addTranslation] = useAddTranslationMutation();

  const selectedWord = useAppSelector(state => state.analyze.selectedWord);

  const handleAddTranslationModalOpen = useCallback(() => {
    setIsAddTranslationModalOpen(true);
  }, []);

  const handleAddTranslationModalClose = useCallback(() => {
    setIsAddTranslationModalOpen(false);
  }, []);

  const handleAddTranslation = useCallback(
    async (translation: string) => {
      if (!selectedWord) {
        return;
      }

      await addTranslation({
        lemma: selectedWord.lemma,
        original: selectedWord.original,
        translation,
        sentence: selectedWord.sentence,
      });

      setIsAddTranslationModalOpen(false);
    },
    [selectedWord, addTranslation]
  );

  return (
    <>
      <div className="mt-4 w-full rounded-md bg-white">
        <div className="flex items-center justify-between border-b-1 border-b-gray-200 p-4">
          <span>
            <span>Translations</span>
            {selectedWord && (
              <span className="ml-2 text-gray-500">
                {selectedWord.original}
                {selectedWord.original !== selectedWord.lemma && (
                  <span> ({selectedWord.lemma})</span>
                )}
              </span>
            )}
          </span>
          <Button disabled={!selectedWord} onClick={handleAddTranslationModalOpen}>
            Add translation
          </Button>
        </div>
        <div className="p-4">
          {!selectedWord && <span>Click on a word to look it up</span>}
          {selectedWord && !selectedWord?.translations?.length && (
            <span>This word has no translations yet</span>
          )}
          {(selectedWord?.translations ?? []).map(translation => (
            <div key={translation.value} className="flex items-center justify-between py-2">
              <span>{translation.value}</span>
              <span className="text-gray-500">{translation.sentence}</span>
            </div>
          ))}
        </div>
      </div>
      <AddTranslationModal
        isOpen={isAddTranslationModalOpen}
        onClose={handleAddTranslationModalClose}
        onTranslationAdd={handleAddTranslation}
      />
    </>
  );
};

export default memo(Translations);
