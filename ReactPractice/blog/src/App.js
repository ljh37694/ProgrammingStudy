/* eslint-disable */

import './App.css';
import { useState } from 'react';

function App() {
  let postTitle = "메가 커피";
  let arr = ["남자 코트 추천", "강남 우동 맛집", "파이썬 독학"];
  let [posts, setPosts] = useState(arr);
  let [likeCount, setLikeCount] = useState(0);

  function likeOnClick() {
    setLikeCount(likeCount + 1);
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
      <div className="item">
        <h4 style={{fontSize: "30px"}}>{posts[0]}</h4>
        <p>2024년 2월 10일 발행</p>
        <button onClick={likeOnClick}>👍</button>
        <span>{likeCount}</span>
      </div>
      <div className="item">
        <h4 style={{fontSize: "30px"}}>{posts[1]}</h4>
        <p>2024년 2월 10일 발행</p>
      </div>
      <div className="item">
        <h4 style={{fontSize: "30px"}}>{posts[2]}</h4>
        <p>2024년 2월 10일 발행</p>
      </div>
      <button onClick={() => {
        arr[0] = "여자 코트 추천";
        setPosts(arr);
      }}>click!</button>
    </div>
  );
}

export default App;
