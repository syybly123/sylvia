import { createSlice, PayloadAction, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
interface ShoppingCartState {
    loading: boolean,
    error: string | null,
    items: any[]
}

const initialState: ShoppingCartState = {
    loading: false,
    error: null,
    items: []

}

export const getShoppingCart = createAsyncThunk(
    "shoppingCart/getShoppingCart",
    async (jwt: string, thunkAPI)=> {
        const{data}= await axios.get(`http://123.56.149.216:8080/api/shoppingCart`,{
            headers:{
                Authorization: `bearer ${jwt}`
            }
        });
        return data.shoppingCartItems;
            }
) ;  

export const addShoppingCartItem = createAsyncThunk(
    "shoppingCart/addShoppingCartItem",
    async (parameters: {jwt: string, touristRouteId: string}, thunkAPI)=> {
        const{data}= await axios.post(`http://123.56.149.216:8080/api/shoppingCart/items`,{
           touristRouteId: parameters.touristRouteId
        },
        {
            headers:{
                Authorization: `bearer ${parameters.jwt}`
            }
        });
        return data.shoppingCartItems;
            }
) ; 





export const checkOut = createAsyncThunk(
    "shoppingCart/checkOut",
    async ( jwt: string, thunkAPI)=> {
        const{data}= await axios.post(`http://123.56.149.216:8080/api/shoppingCart/checkout`,null,
        {
            headers:{
                Authorization: `bearer ${jwt}`
            }
        });
        return data;
            }
) ; 
    
export const clearShoppingCartItem = createAsyncThunk(
    "shoppingCart/clearShoppingCartItem",
    async (parameters: {jwt: string; itemIds: number[]}, thunkAPI)=> {
        return await axios.delete(`http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(',')})`,
        {
            headers:{
                Authorization: `bearer ${parameters.jwt}`
            }
        });
       
            }
) ; 

export const ShoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
       addItem: (state,{payload})=> {
          state.items.push(payload.product)
       }
    },
    extraReducers: {
        [getShoppingCart.pending.type]: (state)=> {
            state.loading= true;
        },
        [getShoppingCart.fulfilled.type]: (state, action)=>{
            state.loading = false;
            state.items = action.payload;
            state.error = null
        },
        [getShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>)=> {
           
            state.loading = false;
            state.error= action.payload
        },
        [addShoppingCartItem.pending.type]: (state)=> {
            state.loading= true;
        },
        [addShoppingCartItem.fulfilled.type]: (state, action)=>{
            state.loading = false;
            state.items = action.payload;
            state.error = null
        },
        [addShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>)=> {
           
            state.loading = false;
            state.error= action.payload
        },
        [clearShoppingCartItem.pending.type]: (state)=> {
            state.loading= true;
        },
        [clearShoppingCartItem.fulfilled.type]: (state)=>{
            state.loading = false;
            state.items = [];
            state.error = null
        },
        [clearShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>)=> {
           
            state.loading = false;
            state.error= action.payload
        },
        [checkOut.pending.type]: (state)=> {
            state.loading= true;
        },
        [checkOut.fulfilled.type]: (state, action)=>{
            state.loading = false;
            state.items = [];
            state.error = null
        },
        [checkOut.rejected.type]: (state, action: PayloadAction<string | null>)=> {
           
            state.loading = false;
            state.error= action.payload
        },
    }
})

export const {addItem} = ShoppingCartSlice.actions;