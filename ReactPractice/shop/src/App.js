import "./App.css";
import data from "./data.js";
import { createContext, useState, useEffect, lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import MainNavbar from "./components/MainNavbar.jsx";
import MainPage from "./pages/MainPage.jsx";
import { useQuery } from "react-query";
import axios from "axios";

export let Context1 = createContext();

const DetailPage = lazy(() => import("./pages/DetailPage.jsx"));
const CartPage = lazy(() => import("./pages/CartPage.jsx"));

function App() {
    let [itemData, setItemData] = useState(data);
    let [stock] = useState([10, 12, 30]);
    let [count, setCount] = useState(2);

    useEffect(() => {
        localStorage.setItem("watchedItems", JSON.stringify([]));
    }, []);

    // 실시간 처리할 때 용이
    let result = useQuery("asdf", () => {
        axios
            .get("https://codingapple1.github.io/userdata.json")
            .then((result) => result.data);
    });

    return (
        <div className="App">
            {result.isLoading && "로딩중"}
            {result.error && "에러남"}
            {result.data && result.data.name}
            <MainNavbar />

            <Suspense fallback={<div>로딩하는 중</div>}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <MainPage
                                itemData={itemData}
                                setItemData={setItemData}
                                count={count}
                                setCount={setCount}
                            />
                        }
                    />
                    <Route
                        path="/detail/:id"
                        element={
                            <Context1.Provider value={stock}>
                                <DetailPage itemData={itemData} />
                            </Context1.Provider>
                        }
                    />
                    <Route
                        path="/event"
                        element={
                            <>
                                <h3>오늘의 이벤트</h3>
                                <Outlet />
                            </>
                        }
                    >
                        <Route
                            path="one"
                            element={<p>첫 주문시 양배추즙 증정</p>}
                        />
                        <Route path="two" element={<p>생일 쿠폰 받기</p>} />
                    </Route>
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
