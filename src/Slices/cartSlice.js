import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem("cartItems")) :[],
    cartTotal: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, quantity, amount } = action.payload;
            const newItem = { id, quantity, price: amount }; 
            state.cartItems.push(newItem);
            state.cartTotal = state.cartItems.reduce((total, item) => {
                return total + (item.price);
            }, 0);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i.product !== action.payload);
            state.cartTotal = state.cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.cartTotal = 0;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;