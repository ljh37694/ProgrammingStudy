import "./App.css";
import data from "./data.js";
import { createContext, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage.js";
import DetailPage from "./pages/DetailPage.jsx";
import MainNavbar from "./components/MainNavbar.jsx";

export let Context1 = createContext();

function App() {
    let [itemData, setItemData] = useState(data);
    let [stock] = useState([10, 12, 30]);

    return (
        <div className="App">
            <MainNavbar />
            <Routes>
                <Route path="/" element={<MainPage itemData={itemData} setItemData={setItemData} />} />
                <Route path="/detail/:id" element={
                    <Context1.Provider value={stock}>
                        <DetailPage itemData={itemData} />
                    </Context1.Provider>
                } />
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
            </Routes>
        </div>
    );
}

export default App;
