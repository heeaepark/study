/* eslint-disable */


import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let post = "포스팅 제목";
  let [postTitle, b] = useState(['깃허브', '리액트 독학', '개발일지']);
  let [thumb, thumbCountMachine] = useState(0);

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{padding: '20px'}}>Blog</h4>
      </div>
      <div className="list">
        <h4>{postTitle[0]} <span className="thumb" onClick={ () => {thumbCountMachine(thumb+=1)}}>👍</span> {thumb}</h4>
        <p>02, August, 2022</p>
      </div>
      <div className="list">
        <h4>{postTitle[1]}</h4>
        <p>02, August, 2022</p>
      </div>
      <div className="list">
        <h4>{postTitle[2]}</h4>
        <p>02, August, 2022</p>
      </div>
    </div>
  );
}

export default App;
