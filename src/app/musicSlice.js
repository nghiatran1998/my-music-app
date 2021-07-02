import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCaller from "../utils/apiCaller";

const initialState = {
  list: [],
};

export const fetchMusicApi = createAsyncThunk(
  "music/fetchMusicApi",
  async () => {
    const response = await apiCaller("musics", "get", null).then((res) => res);
    return response.data;
  }
);

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMusicApi.fulfilled]: (state, action) => {
      state.list = action.payload;
    },
  },
});

export default musicSlice.reducer;
