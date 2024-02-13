import ShoesItems from "./ShoesItems";

function MainPage(props) {
    return (
        <>
            <div className="main-image w-100 m-0"></div>
            <ShoesItems data={props.itemData} />
        </>
    );
}

export default MainPage;