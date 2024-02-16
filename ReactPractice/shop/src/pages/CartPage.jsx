import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { plusCount, addAge, deleteCartItem } from "./../store.js";

function CartPage() {
    let cart = useSelector((state) => state.cartItems);
    let user = useSelector((state) => state.user);
    let dispatch = useDispatch();

    return (
        <>
            <h6>{ user.name }({ user.age })의 장바구니</h6>
            <button onClick={() => dispatch(addAge())} className="btn btn-danger vertical-middle">+</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>1개 더하기</th>
                        <th>삭제하기</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item, idx) => {
                        return (
                            <tr key={item.id}>
                                <td>{idx + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.count}</td>
                                <td>
                                    <button
                                        onClick={() => dispatch(plusCount(item.id))}
                                        className="btn btn-danger"
                                    >
                                        +
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => {
                                        dispatch(deleteCartItem(item.id));
                                    }}>삭제</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

export default CartPage;
