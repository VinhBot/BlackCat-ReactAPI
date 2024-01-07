import { createSlice } from "@reduxjs/toolkit";

export const currentTimes = createSlice({
    name: "currentTimes",
    initialState: JSON.parse(localStorage.getItem("blackcat_timeCurrent")) || {
        currentTimes: 0,
    },
    reducers: {
        setCurrentTimes: (state, action) => {
            state.currentTime = action.payload
            localStorage.setItem("blackcat_timeCurrent", JSON.stringify(state))
        },
        setCurrentTime0: (state, action) => {
            state.currentTime = 0
            localStorage.setItem("blackcat_timeCurrent", JSON.stringify(state))
        },
    },
})

export const { setCurrentTimes } = currentTimes.actions;
export default currentTimes.reducer;