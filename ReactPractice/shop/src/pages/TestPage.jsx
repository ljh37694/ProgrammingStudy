import { memo, useMemo, useTransition, useState, useDeferredValue } from "react";

function takeLongTime() {
    for (let i = 0; i < 10000; i++) {
        console.log(i);
    }
}

// memo는 props가 바뀔 때만 재랜더링이 되도록 함
let TestPage = memo(function() {
    let [isPanding, startTransition] = useTransition();
    let [text, setText] = useState("");
    
    // useEffect와 비슷함
    let result = useMemo(() => {
        setTimeout(() => takeLongTime(), 0);
    }, []);

    let arr = new Array(10000).fill("");
    let state = useDeferredValue(text); // state를 넣고 그 state에 변화가 생기면 나중에 처리해줌

    return (
        <>
            { isPanding && <div>로딩중</div> }
            <div>memo() 사용함</div>
            <input onInput={(e) => {
                let curText = e.currentTarget.value;

                startTransition(() => setText(curText)); // 다른 코드들보다 나중에 처리함
            }}></input>

            { arr.map(() => {
                return <div>{ state }</div>;
            }) }
        </>
    );
});

export default TestPage;