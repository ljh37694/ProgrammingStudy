import { useParams } from "react-router-dom";

function DetailPage(props) {
    let itemData = props.itemData;
    let { id } = useParams();
    let curItem = itemData.find((item) => {
        return item.id == id;
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={`https://codingapple1.github.io/shop/shoes${parseInt(id) + 1}.jpg`}
                        width="100%"
                    />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{curItem.title}</h4>
                    <p>{curItem.content}</p>
                    <p>{curItem.price}</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
