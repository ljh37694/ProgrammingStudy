import axios from "axios";
import ShoesItems from "../components/ShoesItems";
import { useState } from "react";
import { useSelector } from "react-redux";

function MainPage(props) {
    let { itemData, setItemData, count, setCount } = props;
    let [loading, setLoading] = useState(false);

    return (
        <>
            <div className="main-image w-100 m-0"></div>
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
