/* eslint-disable */

import './App.css';
import { useState } from 'react';

function App() {
  let postTitle = "메가 커피";
  let arr = ["남자 코트 추천", "강남 우동 맛집", "파이썬 독학"];
  let [posts, setPosts] = useState(arr);
  let [likeCounts, setLikeCount] = useState([0, 0, 0]);
  let [modalVisible, setModalVisible] = useState(false);
  
  function Modal(props) {
    return (
      <div className="modal">
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={
          {color: '#fff', fontSize: "16px"}
        }>
          블로그임
        </h4>
      </div>
      { posts.map((item, idx) => {
        return (
          <div className="item" key={idx}>
            <h4 onClick={() => setModalVisible(!modalVisible)} style={{fontSize: "30px"}}>{item}</h4>
            <p>2024년 2월 10일 발행</p>
            <button onClick={() => {
                  let copyLikeCounts = [...likeCounts];
                  copyLikeCounts[idx]++;
                  setLikeCount(copyLikeCounts);
            }}>👍</button>
            <span>{likeCounts[idx]}</span>
          </div>
        )
      }) }

      <button onClick={() => {
        let copyArr = [...posts];
        copyArr[0] = "여자 코트 추천";

        setPosts(copyArr);
      }}>수정</button>

      <button onClick={() => {
        let copyArr = [...posts];
        copyArr.sort();

        setPosts(copyArr);
      }}>정렬</button>

      {
        modalVisible === true ? <Modal/> : null
      }
    </div>
  );
}

export default App;
