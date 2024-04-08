export default function Cart(): JSX.Element {
    return (
        <div>
            <h4 className="main-title">Cart</h4>
            <CartItem />
            <CartItem />
        </div>
    );
}

function CartItem(props: any) {
    return (
        <div className="cart-item">
            <p>상품명</p>
            <p>$40</p>
            <p>1개</p>
        </div>
    );
}
