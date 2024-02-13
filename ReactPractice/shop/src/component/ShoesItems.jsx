function ShoesItems(props) {
    let itemData = props.data;

    return (
        <div>
            <div className="row w-100">
                {itemData.map((item, idx) => {
                    return (
                        <div className="col-md-4" key={idx}>
                            <img
                                src={`https://codingapple1.github.io/shop/shoes${idx + 1}.jpg`}
                                width="70%"
                            />
                            <h4>{item.title}</h4>
                            <p>{item.content}</p>
                            <p>{item.price}원</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ShoesItems;