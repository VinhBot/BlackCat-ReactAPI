import { createSlice } from "@reduxjs/toolkit"

export const setTextBtn = createSlice({
   name: "setTextBtn",
   initialState: "Tất Cả",
   reducers: {
      setText: (state, action) => {
         return action.payload
      },
   },
});

export const { setText } = setTextBtn.actions;
export default setTextBtn.reducer;