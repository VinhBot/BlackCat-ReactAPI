import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosAPI } from "../../api.js";

export const fetchDataLyrics = createAsyncThunk("lyrics/fetchDataLyrics", async (id) => {
    return AxiosAPI.getLyrics(id);
});

export const lyrics = createSlice({
    name: "lyrics",
    initialState: JSON.parse(localStorage.getItem("blackbat_lyrics")) || {
        defaultIBGUrls: [],
        lyricByLine: [],
        lyricKara: [],
        isLoading: false,
        isSeek: false,
        word0: 0,
        word1: 1,
    },
    reducers: {
        setIsSeek: (state, action) => {
            state.isSeek = action.payload
            localStorage.setItem("blackbat_lyrics", JSON.stringify(state))
        },
    },
    extraReducers: (builer) => {
        builer.addCase(fetchDataLyrics.pending, (state, action) => {
            state.isLoading = true
        });
        builer.addCase(fetchDataLyrics.rejected, (state, action) => {
            state.isLoading = false
        });
        builer.addCase(fetchDataLyrics.fulfilled, (state, action) => {
            state.defaultIBGUrls = action.payload.defaultIBGUrls;
            if (action.payload.sentences) {
                state.lyricByLine = action.payload.sentences;
            } else {
                state.lyricByLine = false;
            };
            state.isLoading = false;
            localStorage.setItem("blackbat_lyrics", JSON.stringify(state));
        });
    },
})

export const { setIsSeek } = lyrics.actions;
export default lyrics.reducer;