import "./App.css";
import data from "./data.js";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./component/MainPage.js";
import DetailPage from "./component/DetailPage.jsx";
import MainNavbar from "./component/MainNavbar.jsx";

function App() {
    let [itemData, setItemData] = useState(data);

    return (
        <div className="App">
            <MainNavbar />
            <Routes>
                <Route path="/detail" element={ <DetailPage /> } />
                <Route path="/" element={ <MainPage itemData={itemData}/> } />
            </Routes>
        </div>
    );
}

export default App;
