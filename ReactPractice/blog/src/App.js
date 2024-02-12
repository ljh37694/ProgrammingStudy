/* eslint-disable */

import "./App.css";
import { useState } from "react";

function Modal(props) {
    return (
        <div className="modal">
            <h4>{props.title}</h4>
            <p>날짜</p>
            <p>상세내용</p>
            <button onClick={props.clickChangeBtn}>수정</button>
        </div>
    );
}

function App() {
    let postTitle = "메가 커피";
    let arr = ["남자 코트 추천", "강남 우동 맛집", "파이썬 독학"];
    let [posts, setPosts] = useState(arr);
    let [likeCounts, setLikeCount] = useState(posts.map(() => 0));
    let [modalVisible, setModalVisible] = useState(false);
    let [modalTitle, setModalTitle] = useState("");
    let clickChangeBtn = () => {
        let copyArr = [...posts];
        copyArr[0] = "여자 코트 추천";

        setPosts(copyArr);
    };

    return (
        <div className="App">
            <div className="black-nav">
                <h4 style={{ color: "#fff", fontSize: "16px" }}>블로그임</h4>
            </div>
            {posts.map((item, idx) => {
                return (
                    <div className="item" key={idx}>
                        <h4
                            onClick={() => {
                                setModalVisible(!modalVisible);
                                setModalTitle(posts[idx]);
                            }}
                            style={{ fontSize: "30px" }}
                        >{item}</h4>

                        <p>2024년 2월 10일 발행</p>

                        <button
                            onClick={() => {
                                let copyLikeCounts = [...likeCounts];
                                copyLikeCounts[idx]++;
                                setLikeCount(copyLikeCounts);
                            }}
                        >👍</button>
                        <span>{likeCounts[idx]}</span>

                        <button onClick={(e) => {
                            let copyPosts = [...posts];

                            copyPosts.splice(idx, 1);

                            setPosts(copyPosts);
                        }}>삭제</button>
                    </div>
                );
            })}

            <button
                onClick={() => {
                    let copyArr = [...posts];
                    copyArr.sort();

                    setPosts(copyArr);
                }}
            >
                정렬
            </button>

            {modalVisible === true ? (
                <Modal title={modalTitle} clickChangeBtn={clickChangeBtn} />
            ) : null}

            <input type="text" id="title-input" />
            <button onClick={() => {
                let input = document.getElementById("title-input");
                let copyPosts= [input.value ,...posts];

                if (input.value == "") return;
                
                setPosts(copyPosts);
                setLikeCount(copyPosts.map(() => 0));

                input.value = "";
            }}>추가</button>
        </div>
    );
}

export default App;
