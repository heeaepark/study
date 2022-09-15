/* eslint-disable */
import { useState } from 'react';
import { Button, Navbar, Container, Nav, Row, Col} from 'react-bootstrap';
import bg from './bg.png';
import './App.css';
/* import a from './data.js' */
/* import {a, b} from './data.js' */
import data from './data.js'
import {Detail} from './pages/Detail.js'
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import axios from 'axios'; 

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [moreBtn, setMoreBtn] = useState(0);
  let [loading, setLoading] = useState(false);
  let [noitem, setItem] = useState(false);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand onClick={()=>{ navigate('/') }}>ShoeShop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/detail') }}>Detail</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/about') }}>About</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/event') }}>Event</Nav.Link>
        </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg" style={{ backgroundImage: `url(${bg})` }}></div>
            <div className="container">
              <div className="row">
                <Card shoes={shoes}></Card>
              </div>
            </div>

            {
              loading == true ? <Loading></Loading> : null
            }
            {
              noitem == true? <NoItem></NoItem> : null
            }

            <button onClick={(e)=>{
              setLoading(true);

              if(moreBtn == 0) {
                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result)=>{ 
                  setLoading(false);
                  let copyShoes = [...shoes];
                  copyShoes.push(...result.data);
                  setShoes(copyShoes);
                }).catch(()=> {
                  console.log('데이터 가져오기 실패');
                });
                setMoreBtn(moreBtn+1);
              } else if(moreBtn == 1) {
                axios.get('https://codingapple1.github.io/shop/data3.json')
                .then((result)=>{ 
                  setLoading(false);
                  let copyShoes = [...shoes];
                  copyShoes.push(...result.data);
                  setShoes(copyShoes);
                }).catch(()=> {
                  console.log('데이터 가져오기 실패');
                });
                setMoreBtn(moreBtn+1);
              } else {
                setLoading(false);
                setItem(true);
              }
              moreBtn >= 2 ? e.target.style.display = 'none' : null;
            }}>더보기</button>
            
          </>
        } />
        <Route path="/detail/:id" element={<Detail shoes={shoes}/>} />
        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>멤버라능</div>}/>
          <Route path="location" element={<div>위치정보라능</div>}/>
        </Route>
        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}/>
          <Route path="two" element={<div>생일 기념 쿠폰 받기</div>}/>
        </Route>
        <Route path="*" element={<div>없는 페이지 입니다.</div>} />
      </Routes>
      

    </div>
  );
}
function Card(props){
  let shoeslist = props.shoes;
  return(
    shoeslist.map(function(a, i) {
      return(
        <div className="col-md-4" key={i}>
          <img src={`https://codingapple1.github.io/shop/shoes${i+1}.jpg`} width="80%"/>
          <h4>{shoeslist[i].title}</h4>
          <p>{shoeslist[i].content}</p>
        </div>
      )
    })
  )
}

function About(){
  return(
    <div>
      <p>어바웃페이지이이이</p>
      <Outlet></Outlet>
    </div>
  )
}

function Event() {
  return(
    <>
      <h4>오늘의 이벤트</h4>
      <Outlet />
    </>
  )
}

function Loading(){
  return(
    <>
      <p>상품 목록을 불러오고 있습니다.</p>
    </>
  )
}
function NoItem(){
  return(
    <>
      <p>더 이상 상품이 존재하지 않습니다.</p>
    </>
  )
}
export default App;
