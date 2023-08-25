import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let baseUrl = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;

const api = axios.create({
  baseURL: baseUrl,
});

const initialState = {
  status: "",
  error: "",
  conversations: [],
  activeConversation: {},
  notifications: [],
};

export const getConversations = createAsyncThunk(
  "conversation/all",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await api.get("", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.messgae);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConversations.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getConversations.fulfilled, (state, action) => {
      state.status = "succeded";
      state.conversations = action.payload;
    });
    builder.addCase(getConversations.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const { setActiveConversation } = chatSlice.actions;

export default chatSlice.reducer;
