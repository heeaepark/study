import { useEffect, useState } from "react"
import { useParams } from "react-router"
import styled from 'styled-components'

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
    
    return(
        <div className="container">
            {
                alert == true ? 
                <div className="alert alert-warning">2초 이내 구매시 할인!</div>
                : null
            }
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
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
                    <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>
        </div>
    )
}

export {Detail}