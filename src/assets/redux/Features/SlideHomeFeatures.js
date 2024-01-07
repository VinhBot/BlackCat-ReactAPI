import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosAPI } from "../../api.js";

export const fetchHotKey = createAsyncThunk("formSearch/fetchHotKey", async () => {
    return AxiosAPI.getHotKey();
});

export const formSearch = createSlice({
    name: "formSearch",
    initialState: {
        entities: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchHotKey.fulfilled, (state, action) => {
            state.entities = action.payload
            state.loading = false
        });
        builder.addCase(fetchHotKey.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchHotKey.rejected, (state, action) => {
            state.loading = false
        });
    },
});

export default formSearch.reducer;