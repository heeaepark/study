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

function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate();

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
      
      {/* <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link>
 */}
      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg" style={{ backgroundImage: `url(${bg})` }}></div>
            <Container>
              <Row>
                <Card shoes={shoes}></Card>
              </Row>
            </Container>
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
        <Col key={i}>
          <img src={process.env.PUBLIC_URL + `/shoes${i+1}.jpeg`} width="80%"/>
          <h4>{shoeslist[i].title}</h4>
          <p>{shoeslist[i].content}</p>
        </Col>
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
export default App;
