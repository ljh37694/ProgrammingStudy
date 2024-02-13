import { useEffect } from "react";
import { useParams } from "react-router-dom";

function DetailPage(props) {
    let itemData = props.itemData;
    let { id } = useParams();
    let curItem = itemData.find((item) => {
        return item.id == id;
    });

    useEffect(() => {
        setTimeout(() => {
            document.getElementsByClassName("alert")[0].style.visibility= "hidden";
        }, 2000);
    });

    return (
        <div className="container">
            <div className="alert alert-warning">2초 이내 구매시 할인</div>
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
