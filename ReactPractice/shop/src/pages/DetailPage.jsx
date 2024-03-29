import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { Context1 } from "./../App.js";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../store.js";
import { createGlobalStyle } from "styled-components";

function DetailPage(props) {
    let itemData = props.itemData;
    let { id } = useParams();
    let curItem = itemData.find((item) => {
        return item.id == id;
    });
    let [alert, setAlert] = useState(true);
    let [dontDoThat, setDontDoThat] = useState(false);
    let [amount, setAmount] = useState(0);
    let [curTab, setCurTab] = useState(0);
    let [fade, setFade] = useState("");
    let [pageMount, setPageMount] = useState("");
    let cartItems = useSelector(state => state.cartItems);
    let dispatch = useDispatch();

    // html이 다 로드되고 실행됨
    useEffect(() => {
        let timer = setTimeout(() => {
            setAlert(false);
        }, 2000);
    
        /*
            clear up funtion

            위 코드 실행 전에 실행됨
            unmount될 때 실행됨
        */
        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        setDontDoThat(isNaN(amount));
    }, [amount]);

    useEffect(() => {
        setTimeout(() => setFade("end"), 100);
        
        return () => setFade("");
    }, [curTab]);

    useEffect(() => {
        setTimeout(() => setPageMount("end"), 100);

        return () => setPageMount("");
    }, []);

    useEffect(() => {
        let watchedItems = JSON.parse(localStorage.getItem("watchedItems"));
        watchedItems.push(curItem.id);

        watchedItems = new Set(watchedItems);
        watchedItems = Array.from(watchedItems);

        localStorage.setItem("watchedItems", JSON.stringify(watchedItems));
    }, []);

    return (
        <div className={`container start ${pageMount}`}>
            { alert ? <div className="alert alert-warning">2초 이내 구매시 할인</div> : null }
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
                    <button className="btn btn-danger" onClick={() => {
                        let cartItem = {
                            id: curItem.id,
                            name: curItem.title,
                            count: 1
                        };

                        dispatch(addCartItem(cartItem));

                        console.log(cartItem);
                    }}>주문하기</button>
                </div>
            </div>

            { dontDoThat ? <div className="alert alert-danger">그러지 마!!!</div> : null }
            <input id="amount" onInput={ (e) => setAmount(e.target.value)} />

            <div>
                <Nav variant="tabs" defaultActiveKey="link0" onClick={(e) => {
                    let tabNum = parseInt(e.target.dataset["id"]);

                    setCurTab(tabNum);
                }}>
                    <Nav.Item>
                        <Nav.Link eventKey="link0" data-id="0">버튼0</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link1" data-id="1">버튼1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link2" data-id="2">버튼2</Nav.Link>
                    </Nav.Item>
                </Nav>

                <TabContent idx={curTab} className={`start ${fade}`} />
            </div>
        </div>
    );
}

function TabContent(props) {
    let { idx, className } = props;
    let contents = ["0번", "1번", "2번"];
    let stock = useContext(Context1);

    return (
        <div className={className}>{stock[idx]}</div>
    );
}

export default DetailPage;
