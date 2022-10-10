import { useEffect, useState } from "react"
import { useParams } from "react-router"
import styled from 'styled-components';
import {Nav} from 'react-bootstrap';
import './../App.css';
import { useDispatch } from "react-redux";
import { addItem } from './../store.js';

const Detail = function(props) {
    /* let alertDisplay = () => {
        const alertBox = document.querySelector('.alert-warning');
        setTimeout(()=> {
            alertBox.style.display = 'none';
        }, 2000);
    } */
    
    let {id} = useParams();
    let findProd = props.shoes.find(function(el){
        return el.id == id;
    });
    let [alert, setAlert] = useState(true);
    let [checkAlert, setChekAlert] = useState(false);
    let [inputValue, setInputValue] = useState('');
    let [tab, setTab] = useState(0);
    let [fade2, setFade2] = useState('');
    let dispatch = useDispatch();

    useEffect(() => {
      /* alertDisplay(); */
      const a = setTimeout(()=> {setAlert(false);}, 2000);
      return () => {
          clearTimeout(a)
      }
    }, []);
    useEffect(()=> {
      if(isNaN(inputValue) == true) {
          setChekAlert(true);
      } else {
          setChekAlert(false);
      }
    }, [inputValue]);
    useEffect(()=> {
      setTimeout(() => {
        setFade2('end');
      }, 100);
      return(
        setFade2('')
      )
    }, []);

    /* 최근 본 상품 */
    useEffect(()=>{
      let getWatched = JSON.parse(localStorage.getItem('watched'));
      getWatched.unshift(parseInt(id));
      let set = new Set(getWatched);
      let setWatched = [...set];
      localStorage.setItem('watched', JSON.stringify(setWatched));
    }, [])

    return(
      <div className={`container start ${fade2}`}>
        {
            alert == true ? 
            <div className="alert alert-warning">2초 이내 구매시 할인!</div>
            : null
        }
        <div className="row">
          <div className="col-md-6">
              <img src={`https://codingapple1.github.io/shop/shoes${findProd.id+1}.jpg`} width="100%" />
          </div>
          <div className="col-md-6">
            {
              checkAlert == true ?
              <div className="alert alert-danger">숫자만 입력하세요</div>
              : null
            }
            <input type="text" onChange={(e)=> {
              setInputValue(e.target.value);
            }}/>
            <h4 className="pt-5">{findProd.title}</h4>
            <p>{findProd.content}</p>
            <p>{findProd.price}</p>
            <button className="btn btn-danger" onClick={()=>{
              dispatch(addItem( {id: findProd.id, name: findProd.title, count: 1} ))
            }
            }>주문하기</button> 
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Nav variant="tabs"  defaultActiveKey="link0">
              <Nav.Item>
                <Nav.Link onClick={ ()=>{setTab(0)} } eventKey="link0">버튼0</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={ ()=>{setTab(1)} } eventKey="link1">버튼1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={ ()=>{setTab(2)} } eventKey="link2">버튼2</Nav.Link>
              </Nav.Item>
            </Nav>
            <TabContent tab={tab} />
          </div>
        </div>
      </div>
        
    )
}

function TabContent({tab, shoes}){/* props 대신 {}괄호 안에 useState 변수 넣어줘도 됨 */
  /* if(tab == 0) {
    return (<div>탭 01</div>);
  }
  if(tab == 1) {
    return (<div>탭 02</div>);
  }
  if(tab == 2) {
    return (<div>탭 03</div>);
  } */

  let [fade, setFade] = useState('');
  useEffect(()=>{
    setTimeout(()=> {
      setFade('end');
    }, 100)
    return () => {
      setFade('');
    }
  },[tab]);

  return(
    <div className={`start ${fade}`}>
      {[<div>탭 01</div>, <div>탭 02</div>, <div>탭 03</div>][tab]}
    </div>
  )
}

export {Detail}