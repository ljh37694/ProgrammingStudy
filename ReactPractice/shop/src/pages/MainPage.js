import ShoesItems from "../components/ShoesItems";

function MainPage(props) {
    let { itemData, setItemData } = props;

    return (
        <>
            <div className="main-image w-100 m-0"></div>
            <ShoesItems data={itemData} />
            <button
                className="btn btn-danger"
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
        </>
    );
}

export default MainPage;
