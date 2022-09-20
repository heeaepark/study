/* eslint-disable */
import { useEffect, useState } from 'react';
import { Button, Navbar, Container, Nav, Row, Col} from 'react-bootstrap';
import bg from './bg.png';
import './App.css';
/* import a from './data.js' */
/* import {a, b} from './data.js' */
import data from './data.js'
import {Detail} from './pages/Detail.js';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import axios from 'axios'; 
import Card from './component/Card.js'
import Cart from './component/Cart.js'
//import {RecentlyItem} from './component/RecentlyItems.js'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [moreBtn, setMoreBtn] = useState(0);
  let [loading, setLoading] = useState(false);
  let [noitem, setItem] = useState(false);

  useEffect(()=> {
    
    if(localStorage.getItem('watched') === null) {
      localStorage.setItem('watched', JSON.stringify( [] ));
    }
  }, [])

  let result = useQuery(['작명'], ()=>
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{ 
      console.log('요청 됨~~~~~~')
      return a.data 
    }),
    
  )

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand onClick={()=>{ navigate('/') }}>ShoeShop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/detail') }}>Detail</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
        </Nav>
        <Nav className="ms-auto" style={{'color' : 'white'}}>
          {/* {result.isLoading ? '로딩중' : result.data.name} */}
          {result.isLoading && '로딩중'}
          {result.data && result.data.name}
          {result.error && '에러 발생'}
        </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <RecentlyItem shoes={shoes} />
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
        <Route path="/cart" element={ <Cart/>}/>
        <Route path="*" element={<div>없는 페이지 입니다.</div>} />
      </Routes>
      

    </div>
  );
}
function RecentlyItem(props){
  let navigate = useNavigate();
  let recentlyStorage = JSON.parse(localStorage.getItem('watched'));
  let shoesList = props.shoes;
  return(
    <div className="recently-item-list">
      <p>최근 본 상품</p>
      {
        recentlyStorage.map((a, i)=>{
          return(
            <div className="recently-item" key={i}>
              <img src={`https://codingapple1.github.io/shop/shoes${a+1}.jpg`} onClick={()=>{ navigate('/detail/'+a) }} width="80%"/>
              <p>{shoesList[a].title}</p>
            </div>
          )
        })
      }
    </div>
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
