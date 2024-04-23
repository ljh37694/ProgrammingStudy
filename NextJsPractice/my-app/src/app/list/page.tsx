"use client"

import { useEffect, useState } from "react";

export default function List(): JSX.Element {
    const products: string[] = ["Tomatoes", "Pasta", "Coconut"];
    const [amounts, setAmounts] = useState<number[]>(new Array<number>(products.length).fill(0));

    return (
        <div className="list-box">
            <h2 className="main-title">Products</h2>
            {products.map((data: string, idx: number) => {
                return (
                    <div className="food-card" key={idx}>
                        <img src={`food${idx}.png`} className="food-img" />
                        <h4>
                            {data} ${(idx + 1) * 10}
                        </h4>
                        <button className="like-btn" onClick={() => {
                            let copyAmounts: number[] = [...amounts];
                            copyAmounts[idx]++;

                            setAmounts(copyAmounts);
                        }}>👍{amounts[idx]}</button>
                    </div>
                );
            })}
        </div>
    );
}
