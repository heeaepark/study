import { useState } from "react"
import { useParams } from "react-router"
import styled from 'styled-components'

const Detail = function(props) {
    let {id} = useParams();
    let findProd = props.shoes.find(function(el){
        return el.id == id;
    });

    let Custombtn = styled.button`
        border: none;
        background: ${props => props.bg};
        color: ${props => props.bg == 'blue' ? 'white' : 'black'};
    `
    return(
        <div className="container">
            <Custombtn bg="blue">버튼입니당!</Custombtn>
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6">
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