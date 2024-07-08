import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: {
    player1: {
      score: 0,
    },
    player2: {
      score: 0,
    },
  },
  currentMove: "X",
  winOrTie: false,
  layout: ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    moveAdded: {
      reducer(state, action) {
        const { nodeId, currentMove } = action.payload;
        state.layout[nodeId] = currentMove;
        state.currentMove = currentMove === "X" ? "O" : "X";
      },
    },
    reset(state) {
      const { layout, winOrTie } = state;
      if (winOrTie) {
        state.layout = layout.map((node) => (node = "-"));
      }
      state.winOrTie = false;
    },
    isTie(state) {
      const { layout } = state;
      const isNotFull = layout.includes("-");
      if (!isNotFull) {
        state.winOrTie = true;
        alert("Tie");
      }
    },
    isWin(state) {
      const { layout } = state;
      let winner = "";
      if (
        layout[0] != "-" &&
        layout[0] === layout[1] &&
        layout[0] === layout[2]
      ) {
        winner = layout[0];
      } else if (
        layout[3] != "-" &&
        layout[3] === layout[4] &&
        layout[3] === layout[5]
      ) {
        winner = layout[3];
      } else if (
        layout[6] != "-" &&
        layout[6] === layout[7] &&
        layout[6] === layout[8]
      ) {
        winner = layout[6];
      } else if (
        layout[0] != "-" &&
        layout[0] === layout[3] &&
        layout[0] === layout[6]
      ) {
        winner = layout[0];
      } else if (
        layout[1] != "-" &&
        layout[1] === layout[4] &&
        layout[1] === layout[7]
      ) {
        winner = layout[1];
      } else if (
        layout[2] != "-" &&
        layout[2] === layout[5] &&
        layout[2] === layout[8]
      ) {
        winner = layout[2];
      } else if (
        layout[0] != "-" &&
        layout[0] === layout[4] &&
        layout[0] === layout[8]
      ) {
        winner = layout[0];
      } else if (
        layout[2] != "-" &&
        layout[2] === layout[4] &&
        layout[2] === layout[6]
      ) {
        winner = layout[2];
      }
      if (winner) {
        state.winOrTie = true;
        if (winner === "X") {
          state.players.player1.score++;
        } else if (winner === "O") {
          state.players.player2.score++;
        }
        alert(`${winner} Win`);
      }
    },
  },
});

export const selectLayout = (state) => state.board.layout;
export const selectCurrentMove = (state) => state.board.currentMove;
export const selectPlayers = (state) => state.board.players;

export const { moveAdded, isTie, isWin, reset } = boardSlice.actions;

export default boardSlice.reducer;
