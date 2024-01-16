import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'http://localhost:3001';

export const sendData = createAsyncThunk( 'data/put', async ( updateData, { rejectWithValue } ) => {
    console.log(updateData);
    try {
        const response = await axios.put(URL + `/update`, updateData);
        return response?.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const dataSlice = createSlice({
    name: 'reducer',
    initialState: {
        data: [],
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
    extraReducers( builder ) {
        builder
            .addCase(sendData.fulfilled, (state, action) => {
                console.log(data);
            })
    }
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;