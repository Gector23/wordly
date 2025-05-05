import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type SelectedWord } from "../../types/word.types";

interface AnalyzeState {
  selectedWord?: SelectedWord;
}

const initialState: AnalyzeState = {
  selectedWord: undefined,
};

const analyze = createSlice({
  name: "analyze",
  initialState,
  reducers: {
    setSelectedWord(state, action: PayloadAction<SelectedWord | undefined>) {
      state.selectedWord = action.payload;
    },
  },
});

export const { setSelectedWord } = analyze.actions;
export default analyze.reducer;
