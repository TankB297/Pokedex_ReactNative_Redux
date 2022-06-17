import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  list: [],
  loading: false,
  error: null,
  listSearch: [],
  listFavourite: [],
  avatar: 'Empty',
  wallpaper: 'Empty',
};

export const listItemSlice = createSlice({
  name: 'listItem',
  initialState,
  reducers: {
    fetchListItem: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    succeedListItem: (state, action) => {
      state.error = null;
      state.list = action.payload;
      state.loading = false;
    },
    failListItem: (state, action) => {
      state.error = action.payload;
      state.list = [];
      state.loading = false;
    },
    searchListItem: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    succeedSearchListItem: (state, action) => {
      state.error = null;
      state.listSearch = action.payload;
      state.loading = false;
    },
    failSearchListItem: (state, action) => {
      state.error = action.payload;
      state.listSearch = [];
      state.loading = false;
    },
    addToFavourite: (state, action) => {
      state.listFavourite = action.payload;
    },
    updateAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    updateWallpaper: (state, action) => {
      state.wallpaper = action.payload;
    },
  },
});

export const {
  fetchListItem,
  succeedListItem,
  failListItem,
  searchListItem,
  succeedSearchListItem,
  failSearchListItem,
  addToFavourite,
  updateAvatar,
  updateWallpaper,
} = listItemSlice.actions;

export default listItemSlice.reducer;
