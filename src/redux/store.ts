import { createStore, applyMiddleware } from "redux";
import languageReducer from  './language/languageReducer';
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import thunk from 'redux-thunk';
import { actionLog } from "./middlewares/actionLog";
import { ProductDetailSlice } from './productDetail/slice';
import { ProductSearchSlice } from "./productSearch/slice";
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { UserSlice } from './user/slice'
import { useDispatch } from "react-redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ShoppingCartSlice, getShoppingCart, addShoppingCartItem, clearShoppingCartItem} from './shoppingCart/slice';
import {PlaceOrderSlice} from './order/slice';
const persistConfig ={
    key: "root",
    storage,
    whitelist: ["user"]

}
const rootReducer = combineReducers({
    language:languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: ProductDetailSlice.reducer,
    productSearch: ProductSearchSlice.reducer,
    user: UserSlice.reducer,
    shoppingCart: ShoppingCartSlice.reducer,
    order: PlaceOrderSlice.reducer
});

const persistedReducer = persistReducer(persistConfig,rootReducer);
//const store = createStore(rootReducer, applyMiddleware(thunk,actionLog));
const store= configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        [...getDefaultMiddleware(),actionLog]
    ,
    devTools:true
})

const persistor = persistStore(store);
export type RootState = ReturnType <typeof store.getState>
export default {store, persistor} ;