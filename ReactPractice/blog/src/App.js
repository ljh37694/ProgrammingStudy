import logo from './logo.svg';
import './App.css';

function App() {
  let postTitle = "메가 커피";

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={
          {color: '#fff', fontSize: "16px"}
        }>
          블로그임
        </h4>
      </div>
      <h4 style={{fontSize: "30px"}}>{postTitle}</h4>
    </div>
  );
}

export default App;
