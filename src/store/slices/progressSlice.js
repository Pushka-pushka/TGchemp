import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { progressApi } from '../../api';

export const fetchStudentProgress = createAsyncThunk(
  'progress/fetchAll',
  async () => progressApi.getStudentProgress(),
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchStudentProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка загрузки данных';
      });
  },
});

export default progressSlice.reducer;
