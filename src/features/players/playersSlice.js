// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   player1: {
//     score: 0,
//   },
//   player2: {
//     score: 0,
//   },
// };

// const playersSlice = createSlice({
//   name: "players",
//   initialState,
//   reducers: {
//     addPlayerWin: {
//       reducer(state, action) {
//         const legend = action.payload;
//         console.log(legend);
//         if (legend === "X") {
//           state.player1.score++;
//           console.log(state.player1);
//         } else if (legend === "O") {
//           state.player2.score++;
//           console.log(state.player1);
//         }
//       },
//     },
//   },
// });

// export const { addPlayerWin } = playersSlice.actions;

// export default playersSlice.reducer;
