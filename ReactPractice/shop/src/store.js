import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name: "user",
    initialState: { name: "Lee", age: 23 },
});

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
