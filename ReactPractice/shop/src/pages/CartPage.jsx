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
                { stock.map((result) => {
                    return (
                        <tr>
                            <td>{result.id}</td>
                            <td>{result.name}</td>
                            <td>{result.count}</td>
                            <td>?</td>
                        </tr>
                    );
                }) }
            </tbody>
        </Table>
    );
}

export default CartPage;
