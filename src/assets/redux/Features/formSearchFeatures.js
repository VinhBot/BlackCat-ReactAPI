import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosAPI } from "../../api.js";

export const fetchHotKey = createAsyncThunk("formSearch/fetchHotKey", async () => {
    return AxiosAPI.getHotKey();
});

export const fetchDataSearch = createAsyncThunk("formSearch/fetchDataSearch ", async (name) => {
    return AxiosAPI.getHotSuggestion(name)
});

export const formSearch = createSlice({
    name: "formSearch",
    initialState: {
        entities: "",
        loading: false,
        entitiesNew: "",
        names: "",
    },
    reducers: {
        setName: (state, action) => {
            state.names = action.payload;
        },
        setValueNew: (state, action) => {
            state.entitiesNew = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDataSearch.fulfilled, (state, action) => {
            state.entitiesNew = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchDataSearch.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchDataSearch.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(fetchHotKey.fulfilled, (state, action) => {
            state.entities = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchHotKey.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchHotKey.rejected, (state, action) => {
            state.loading = false;
        });
    },
});

export default formSearch.reducer;
export const { setName, setValueNew } = formSearch.actions;