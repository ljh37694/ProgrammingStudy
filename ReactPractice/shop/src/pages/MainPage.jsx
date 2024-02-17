import axios from "axios";
import ShoesItems from "../components/ShoesItems";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

let WatchedItems = styled.div`
    position: fixed;
    left: 80%;
    top: 100px;
    width: 100px;
    height: 200px;
    background-color: #fff;
    border: 1px solid black;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;

function MainPage(props) {
    let { itemData, setItemData, count, setCount } = props;
    let [loading, setLoading] = useState(false);
    let watched = JSON.parse(localStorage.getItem("watchedItems"));

    return (
        <>
            <div className="main-image w-100 m-0"></div>
            <WatchedItems>
                <Link to="/cart" style={{textDecorationLine: "none"}}>
                    <h6 className="p-2" style={{backgroundColor: "grey", color: "#fff"}}>CART</h6>
                </Link>
                <p style={{fontSize: "12px"}}>최근 본 상품</p>
                { watched.map((id) => {
                    return (
                        <p key={id}>{ itemData.find((item) => {
                            return item.id == id;
                        }).title }</p>
                    );
                }) }
            </WatchedItems>
            <ShoesItems data={itemData} />
            <button
                className="btn btn-danger me-3"
                onClick={() => {
                    let copyItemData = [...itemData];

                    copyItemData.sort((a, b) => {
                        return (a.title < b.title ? -1 : (a.title > b.title ? 1 : 0));
                    });

                    setItemData(copyItemData);
                }}
            >
                정렬
            </button>
            <button className="btn btn-danger" onClick={() => {
                setLoading(true);

                axios.get(`https://codingapple1.github.io/shop/data${count}.json`)
                .then((result) => {
                    setCount(count + 1);
                    setItemData([...itemData, ...result.data]);
                    setLoading(false);
                })
                .catch(() => {
                    alert("상품 더 없음");
                    setLoading(false);
                });
            }}>더보기</button>

            { loading ? <p>로딩 중</p> : null }
        </>
    );
}

export default MainPage;
