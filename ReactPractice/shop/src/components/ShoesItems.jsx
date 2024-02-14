function ShoesItems(props) {
    let itemData = props.data;

    return (
        <div className="row w-100">
            {itemData.map((item) => {
                return (
                    <div className="col-md-4" key={item.id}>
                        <img
                            src={`https://codingapple1.github.io/shop/shoes${item.id + 1}.jpg`}
                            width="70%"
                        />
                        <h4>{item.title}</h4>
                        <p>{item.content}</p>
                        <p>{item.price}원</p>
                    </div>
                );
            })}
        </div>
    );
}

export default ShoesItems;