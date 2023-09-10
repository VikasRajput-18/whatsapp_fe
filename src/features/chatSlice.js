import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let baseUrl = `${process.env.REACT_APP_API_ENDPOINT}`;

const api = axios.create({
  baseURL: baseUrl,
});

const initialState = {
  status: "",
  error: "",
  conversations: [],
  activeConversation: {},
  messages: [],
  notifications: [],
  files: [],
};

export const getConversations = createAsyncThunk(
  "conversation/all",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/conversation", {
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

export const open_create_conversation = createAsyncThunk(
  "conversation/open_create",
  async (values, { rejectWithValue }) => {
    const { token, receiver_id, isGroup } = values;
    try {
      const { data } = await api.post(
        "/conversation",
        { receiver_id, isGroup },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.messgae);
    }
  }
);
export const createGroupConversation = createAsyncThunk(
  "conversation/create_group",
  async (values, { rejectWithValue }) => {
    const { token, name, users } = values;
    try {
      const { data } = await api.post(
        "/conversation/group",
        { name, users },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.messgae);
    }
  }
);

export const getConversationMessages = createAsyncThunk(
  "conversation/messages",
  async (values, { rejectWithValue }) => {
    const { token, convo_id } = values;
    try {
      const { data } = await api.get(`/message/${convo_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("data", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.messgae);
    }
  }
);
export const sendMessages = createAsyncThunk(
  "message/messages",
  async (values, { rejectWithValue }) => {
    const { token, message, convo_id, files } = values;
    try {
      const { data } = await api.post(
        `/message`,
        {
          message,
          convo_id,
          files,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    updateMessagesAndConversation: (state, action) => {
      // update message
      let convo = state.activeConversation;
      if (convo._id === action.payload.conversation._id) {
        state.messages = [...state.messages, action.payload];
      }
      // update conversation
      let conversation = {
        ...action.payload.conversation,
        latestMessage: action.payload,
      };
      let newConvos = [...state.conversations].filter(
        (c) => c._id !== conversation?._id
      );

      newConvos.unshift(conversation);
      state.conversations = newConvos;
    },
    addFiles: (state, action) => {
      state.files = [...state.files, action.payload];
    },
    clearFiles: (state, action) => {
      state.files = [];
    },
    removeFileFromFiles: (state, action) => {
      let index = action.payload;
      let files = [...state.files];
      let fileToRemove = [files[index]];
      state.files = files.filter((file) => !fileToRemove.includes(file));
    },
  },
  _extraReducers: (builder) => {
    builder
      .addCase(getConversations.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.status = "succeded";
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(open_create_conversation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(open_create_conversation.fulfilled, (state, action) => {
        state.status = "succeded";
        state.activeConversation = action.payload;
        state.files = [];
      })
      .addCase(open_create_conversation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getConversationMessages.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getConversationMessages.fulfilled, (state, action) => {
        state.status = "succeded";
        state.messages = action.payload;
      })
      .addCase(getConversationMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(sendMessages.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(sendMessages.fulfilled, (state, action) => {
        state.status = "succeded";
        state.messages = [...state.messages, action.payload];
        let conversation = {
          ...action.payload.conversation,
          latestMessage: action.payload,
        };
        let newConvos = [...state.conversations].filter(
          (c) => c._id !== conversation?._id
        );

        newConvos.unshift(conversation);
        state.conversations = newConvos;
      })
      .addCase(sendMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
  get extraReducers() {
    return this._extraReducers;
  },
  set extraReducers(value) {
    this._extraReducers = value;
  },
});

export const {
  setActiveConversation,
  updateMessagesAndConversation,
  addFiles,
  clearFiles,
  removeFileFromFiles,
} = chatSlice.actions;

export default chatSlice.reducer;
