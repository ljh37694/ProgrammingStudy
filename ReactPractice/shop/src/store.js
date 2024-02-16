import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name: "user",
    initialState: { name: "Lee", age: 23 },

    reducers: {
        addAge(state) {
            state.age++;
        }
    }
});

export let { addAge } = user.actions;

let stock = createSlice({
    name: "stock",
    initialState: [
        { id: 0, name: "White and Black", count: 2 },
        { id: 2, name: "Grey Yordan", count: 1 },
    ],
    reducers: {
        changeStock(cur) {

        }
    }
});

export let { changeStock } = stock.actions;

export default configureStore({
    reducer: {
        user: user.reducer,
        stock : stock.reducer,
    },
});
