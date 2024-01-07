import { createSlice } from "@reduxjs/toolkit";

export const toggleRight = createSlice({
   name: "toggleright",
   initialState: false,
   reducers: {
      setToggle: (state) => !state,
   },
});

export const { setToggle } = toggleRight.actions;
export default toggleRight.reducer;