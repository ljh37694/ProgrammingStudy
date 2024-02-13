import "./App.css";
import data from "./data.js";
import { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import MainPage from "./component/MainPage.js";
import DetailPage from "./component/DetailPage.jsx";
import MainNavbar from "./component/MainNavbar.jsx";

function App() {
    let [itemData, setItemData] = useState(data);

    return (
        <div className="App">
            <MainNavbar />
            <Routes>
                <Route path="/detail" element={<DetailPage />} />
                <Route path="/" element={<MainPage itemData={itemData} />} />
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
