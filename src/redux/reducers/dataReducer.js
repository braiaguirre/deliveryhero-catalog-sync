import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'http://localhost:3001';

export const sendData = createAsyncThunk( 'data/put', async ( updateData, { rejectWithValue } ) => {
    try {
        const response = await axios.put(URL + `/update`, updateData);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const dataSlice = createSlice({
    name: 'reducer',
    initialState: {
        products: [],
        id: 0,
        error: ''
    },
    reducers: {
        setData: (state, action) => {
            state.products = action.payload;
        },
        setId: (state, action) => {
            state.id = action.payload;
        },
        clearDataError: (state, action) => {
            state.error = '';
        }
    },
    extraReducers( builder ) {
        builder
            .addCase(sendData.fulfilled, (state, action) => {
                alert(action.payload)
            })
            .addCase(sendData.rejected, (state, action) => {
                alert(action.payload)
            })
    }
});

export const { setData, setId } = dataSlice.actions;
export default dataSlice.reducer;