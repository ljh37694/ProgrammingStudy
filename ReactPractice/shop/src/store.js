import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name: "user",
    initialState: { name: "Lee", age: 23 },

    reducers: {
        addAge(state) {
            state.age++;
            console.log(state);
        }
    }
});

export let { addAge } = user.actions;

let cartItems = createSlice({
    name: "cartItem",
    initialState: [
        { id: 0, name: "White and Black", count: 2 },
        { id: 2, name: "Grey Yordan", count: 1 },
    ],
    reducers: {
        plusCount(state, id) {
            let cur = state.find((data) => data.id === id.payload);

            cur.count++;
        },
        addCartItem(state, data) {
            state.push(data.payload);
        }
    }
});

export let { plusCount, addCartItem } = cartItems.actions;

export default configureStore({
    reducer: {
        user: user.reducer,
        cartItems : cartItems.reducer,
    },
});
