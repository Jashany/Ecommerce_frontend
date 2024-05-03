import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authslice';
import  {apiSlice}  from './Slices/apiSlice';
import cartReducer from './Slices/cartSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        [apiSlice.reducerPath] : apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;