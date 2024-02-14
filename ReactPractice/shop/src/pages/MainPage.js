import axios from "axios";
import ShoesItems from "../components/ShoesItems";

function MainPage(props) {
    let { itemData, setItemData } = props;

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
                axios.get("https://codingapple1.github.io/shop/data2.json")
                .then((result) => {
                    setItemData([...itemData, ...result.data]);
                });
            }}>더보기</button>
        </>
    );
}

export default MainPage;
