import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
interface ProductSearchState {
    loading: boolean,
    error: string | null,
    data: any,
    pagination: any
}

const initialState: ProductSearchState = {
    loading: false,
    error: null,
    data: null,
    pagination: {
    
    totalCount:16,pageSize:10,currentPage:1,totalPages:1}

}

export const searchProduct = createAsyncThunk(
    "productSearch/searchProduct",
    async (paramaters: {
        keywords: string,
        nextPage: number | string,
        pageSize: number | string
    }, thunkAPI)=> {
        let url =`http://123.56.149.216:8080/api/touristRoutes?pageNumber=${paramaters.nextPage}&pageSize=${paramaters.pageSize}`;
        if (paramaters.keywords) {
            url += `&keyword=${paramaters.keywords}`;
        }
        const response = await axios.get(url);
        return {
            data: response.data,
            pagination: JSON.parse(response.headers["x-pagination"])
        }
    }
       
)   
    

export const ProductSearchSlice = createSlice({
    name: "productSearch",
    initialState,
    reducers: {
       
    },
    extraReducers: {
        [searchProduct.pending.type]: (state)=> {
            state.loading= true;
        },
        [searchProduct.fulfilled.type]: (state, action)=>{
            state.loading = false;
            state.data = action.payload.data;
            state.pagination = action.payload.pagination
            state.error = null
        },
        [searchProduct.rejected.type]: (state, action: PayloadAction<string | null>)=> {
           
            state.loading = false;
            state.error= action.payload
        }
    }
})