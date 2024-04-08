export default function List(): JSX.Element {
    const products: string[] = ["Tomatoes", "Pasta", "Coconut", "Kimchi"];

    return (
        <div className="list-box">
            <h2 className="main-title">Products</h2>
            {products.map((data, idx) => {
                return (
                    <div className="food-card" key={idx}>
                    <h4>{data} ${(idx + 1) * 10}</h4>
                </div>
                );
            })}
        </div>
    );
}
