import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'http://localhost:3001';

export const sendData = createAsyncThunk( 'data/put', async (updateData, { rejectWithValue }) => {
    try {
        const response = await axios.put(URL + `/products/`, updateData);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const fetchData = createAsyncThunk( 'data/get', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(URL + `/products/${ id }`);
        return response.data;
    } catch (err) {
        // return rejectWithValue(err.response.data);
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
        clearData: (state, action) => {
            state.products = [];
        },
        setId: (state, action) => {
            state.id = action.payload;
        },
        clearId: (state, action) => {
            state.id = 0;
        },
        clearDataError: (state, action) => {
            state.error = '';
        },
    },
    extraReducers( builder ) {
        builder
            .addCase(sendData.fulfilled, (state, action) => {
                alert(action.payload);
            })
            .addCase(sendData.rejected, (state, action) => {
                alert(action.payload);
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.products = action.payload;
            })
    }
});

export const { setData, clearData, setId, clearId } = dataSlice.actions;
export default dataSlice.reducer;