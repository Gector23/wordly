import Word from "#models/word.model";
import { wrapError } from "#utils/errors";

export const addWordTranslation = async ({
  lemma,
  original,
  translation,
  sentence,
}: {
  lemma: string;
  original: string;
  translation: string;
  sentence: string;
}) => {
  try {
    const word = await Word.exists({ lemma });

    if (!word) {
      await Word.create({
        lemma,
        translations: [{ value: translation, original, sentence }],
      });
    } else {
      await Word.updateOne(
        { lemma },
        {
          $addToSet: {
            translations: { value: translation, original, sentence },
          },
        }
      );
    }
  } catch (err) {
    throw wrapError("Failed to add translation.", err);
  }
};
