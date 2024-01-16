import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: 'reducer',
    initialState: {
        data: {},
        error: ''
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        clearDataError: (state, action) => {
            state.error = '';
        }
    },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;