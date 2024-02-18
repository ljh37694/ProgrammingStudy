import { memo, useMemo } from "react";

function takeLongTime() {
    for (let i = 0; i < 10000; i++) {
        console.log(i);
    }
}

// memo는 props가 바뀔 때만 재랜더링이 되도록 함
let TestPage = memo(function() {
    // useEffect와 비슷함
    let result = useMemo(() => {
        takeLongTime();
    }, []);

    return (
        <div>memo() 사용함</div>
    );
});

export default TestPage;