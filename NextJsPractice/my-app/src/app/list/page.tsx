export default function List(): JSX.Element {
    const products: string[] = ["Tomatoes", "Pasta", "Coconut"];

    return (
        <div className="list-box">
            <h2 className="main-title">Products</h2>
            {products.map((data, idx) => {
                return (
                    <div className="food-card" key={idx}>
                        <img src={`food${idx}.png`} className="food-img" />
                        <h4>
                            {data} ${(idx + 1) * 10}
                        </h4>
                    </div>
                );
            })}
        </div>
    );
}
