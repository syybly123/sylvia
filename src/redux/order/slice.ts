import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { checkOut } from '../shoppingCart/slice';
interface OrderState {
    loading: boolean,
    error: string | null,
    currentOrder: any
}

const initialState: OrderState = {
    loading: false,
    error: null,
    currentOrder: null

}

export const placeOrder = createAsyncThunk(
    "order/placeOrder",
    async (parameters :{ jwt: string, orderId: string}, thunkAPI)=> {
        const{data}= await axios.post(`http://123.56.149.216:8080/api/orders/${parameters.orderId}/placeOrder`,null,{
            headers: {
                Authorization: `bearer ${parameters.jwt}`
            }
        });
        return data;
            }
)   
    

export const PlaceOrderSlice = createSlice({
    name: "placeOrder",
    initialState,
    reducers: {
       
    },
    extraReducers: {
        [placeOrder.pending.type]: (state)=> {
            state.loading= true;
        },
        [placeOrder.fulfilled.type]: (state, action)=>{
            state.loading = false;
            state.currentOrder = action.payload;
            state.error = null
        },
        [placeOrder.rejected.type]: (state, action: PayloadAction<string | null>)=> {
           
            state.loading = false;
            state.error= action.payload
        },
        [checkOut.pending.type]: (state)=> {
            state.loading= true;
        },
        [checkOut.fulfilled.type]: (state, action)=>{
            state.loading = false;
            state.currentOrder = action.payload;
            state.error = null
        },
        [checkOut.rejected.type]: (state, action: PayloadAction<string | null>)=> {
           
            state.loading = false;
            state.error= action.payload
        }
    }
})