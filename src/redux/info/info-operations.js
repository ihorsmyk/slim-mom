import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { token } from 'htpp/htpp';
import API from 'services/API';

axios.defaults.baseURL = 'https://slimmom-backend.goit.global';

export const infoUser = createAsyncThunk('infoUser', async (date, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistToken = state.auth.token;
  if (persistToken === null) {
    return thunkAPI.rejectWithValue();
  }
  token.set(persistToken);
  try {
    const { data } = await API.getInfoForDay(date);
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue();
  }
});
