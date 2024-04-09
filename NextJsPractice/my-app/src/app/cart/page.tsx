export default function Cart(): JSX.Element {
    const products: string[] = ["Tomatoes", "Pasta", "Coconut"];

    return (
        <div>
            <h4 className="main-title">Cart</h4>
            {products.map((item: string) => {
                return (
                    <CartItem name={item} />
                );
            })}
        </div>
    );
}

function CartItem(props: any) {
    const { name } = props;

    return (
        <div className="cart-item">
            <p>{name}</p>
            <p>$40</p>
            <p>1개</p>
        </div>
    );
}
