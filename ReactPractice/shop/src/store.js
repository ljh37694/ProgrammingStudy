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
            let idx = state.findIndex((item) => {
                return data.payload.id == item.id;
            });

            if (idx != -1) {
                state[idx].count++;
            } else {
                state.push(data.payload);
            }
        },
        deleteCartItem(state, action) {
            let idx = state.findIndex(item => item.id == action.payload);

            state.splice(idx, 1);
        }
    }
});

export let { plusCount, addCartItem, deleteCartItem } = cartItems.actions;

export default configureStore({
    reducer: {
        user: user.reducer,
        cartItems : cartItems.reducer,
    },
});
