import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeStock } from "./../store.js";

function CartPage() {
    let stock = useSelector((state) => state.stock);
    let user = useSelector((state) => state.user);
    let dispatch = useDispatch();

    return (
        <>
            <h6>{ user.name }({ user.age })의 장바구니</h6>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {stock.map((item, idx) => {
                        return (
                            <tr key={item.id}>
                                <td>{idx + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.count}</td>
                                <td>
                                    <button
                                        onClick={() => dispatch(changeStock())}
                                        className="btn btn-danger"
                                    >
                                        버튼
                                    </button>
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
