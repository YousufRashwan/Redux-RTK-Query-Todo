import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../features/board/boardSlice";
// import playersReducer from "../features/players/playersSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    // players: playersReducer,
  },
});
