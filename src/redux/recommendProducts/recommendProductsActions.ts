import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
export const FETCH_RECOMMEND_PRODUCTS_START = "fetch_recommend_products_start";
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = "fetch_recommend_products_success";
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "fetch_recommend_products_fail";
//export const GET_DATA_ACTION = "get_data_action";

interface FetchRecommendProductsStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductsSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: any
}

interface FetchRecommendProductsFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: any
}

export type RecommendProductAction = FetchRecommendProductsStartAction | FetchRecommendProductsSuccessAction | FetchRecommendProductsFailAction;

export const fetchRecommendProductsStartActionCreator  =(): FetchRecommendProductsStartAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START
    }
}


export const fetchRecommendProductsSuccessActionCreator  =(data): FetchRecommendProductsSuccessAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload:data
    }
}

export const fetchRecommendProductsFailActionCreator  =(error): FetchRecommendProductsFailAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error
    }
}

export const getDataActionCreator = ():ThunkAction<void, RootState, unknown, RecommendProductAction>=> async(dispatch, getState)=>{

        dispatch(fetchRecommendProductsStartActionCreator());
        try {
            const {data} = await axios.get("http://123.56.149.216:8080/api/productCollections");
            dispatch(fetchRecommendProductsSuccessActionCreator(data));
          
           } catch (err) {
             if( err instanceof Error) {
               dispatch(fetchRecommendProductsFailActionCreator(err))
             
             }
             
            
           }
    
}