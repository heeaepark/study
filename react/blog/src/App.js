/* eslint-disable */
import './App.css';
import { useState } from 'react';

function App() {
  let [글제목, 글제목변경] = useState(['남자 코트 추천','강남 우동 맛집','파이썬 독학']);
  let [따봉, 따봉변경] = useState([1,2,3]);
  let [modal, setModal] = useState(false);
  let [modalTit, setModalTit] = useState(0);
  let [입력값, 입력값변경] = useState('');
  let [발행일, 발행일변경] = useState(getToday);

  let modiTxt = function(){
    let 글제목복사 = [...글제목];
    글제목복사[0] = '여자 코트 추천';
    글제목변경(글제목복사);
  }
  function getToday() {
    var today = new Date();

    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = `${year}-${month}-${day}`;
    return(dateString);
  }
  let addPost = function() {
    if (입력값 == '' || 입력값 == null || 입력값 == undefined) {}
    else {
      let 글제목복사 = [...글제목];
      let 따봉복사 = [...따봉];
      글제목복사.unshift(입력값);
      따봉복사.unshift(0);
      글제목변경(글제목복사);
      따봉변경(따봉복사)
      발행일변경(getToday);
      입력값 = '';
      입력값변경('');
    }
    
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{marign: 0, fontSize: '16px'}}>
          React Blog
        </h4>
      </div>

      {
        글제목.map(function(a, i){
          return (
            <div onClick={() => {setModal(!modal); setModalTit(i)}} className="list" key={i}> 
              <h4>{ 글제목[i] } <span className="thumb" onClick={(e) => {
                e.stopPropagation();
                let 따봉카피 = [...따봉];
                따봉카피[i]+=1;
                따봉변경(따봉카피)
              }}>👍 </span> {따봉[i]} </h4>
              {/* <h4> a </h4> 이것도 가능함 */}
              <p> {발행일} </p>
              <button onClick={() => {
                let 글제목카피 = 글제목;
                let 따봉카피 = 따봉;
                글제목카피.splice(i,1);
                글제목변경(글제목카피);
                console.log(글제목카피)
                따봉.splice(i,1);
                따봉변경(따봉카피);
                console.log(따봉카피)
              }}>글삭제</button>
            </div>
          )
        })
      }
      <input type="text" onInput={(e) => {
        입력값변경(e.target.value);
      }}></input>
      <button onClick={addPost}>글발행</button>


      {
        modal == true ? <Modal 글제목={글제목} modalTit={modalTit} 글제목변경={modiTxt} /> : null
      }
    </div>
  );
}

/*
컴포넌트 함수, 함수명은 대문자로 시작 리턴문 안에 넣고, 
하나의 div 안에 html을 넣어야함 의미없는 div 남발 싫으면 <> </> 이 사이에 넣으면 됨
컴포넌트 언제 써 ? 반복적인 html 축약/큰홈헤이지/자주변경되는 ui
*/
function Modal(props){
  return(
    <>
    <div className="modal">
      <h4>{props.글제목[props.modalTit]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      {<button onClick={() => { props.글제목변경() }}>글수정</button>}
    </div>
    </>
  )
}

export default App;
