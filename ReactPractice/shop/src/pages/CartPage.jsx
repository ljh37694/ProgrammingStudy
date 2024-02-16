import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

function CartPage() {
    let stock = useSelector(state => state.stock);

    console.log(stock);

    return (
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
                { stock.map((item) => {
                    return (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                            <td>?</td>
                        </tr>
                    );
                }) }
            </tbody>
        </Table>
    );
}

export default CartPage;
