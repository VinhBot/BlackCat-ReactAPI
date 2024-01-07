import { createSlice } from "@reduxjs/toolkit";

export const setOpenMainMv = createSlice({
   name: "setOpenMainMv",
   initialState: {
      isOpen: false,
      historyOpen: "/",
      historyOut: "",
      id: "",
   },
   reducers: {
      setOpenOn: (state, action) => {
         state.isOpen = true
      },

      setLocationOpen: (state, action) => {
         state.historyOpen = action.payload
      },

      setOpenOff: (state, action) => {
         state.isOpen = false
      },
   },
})

export const { setOpenOn, setOpenOff, setLocationOpen } = setOpenMainMv.actions;
export default setOpenMainMv.reducer;