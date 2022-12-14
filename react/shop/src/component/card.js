import data from './../data.js'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';

export default function Card(props){
    let navigate = useNavigate();
    let shoeslist = props.shoes;
    let [initData, setInitData] = useState(data);
    return(
        shoeslist.map(function(a, i) {
        return(
            <div className="col-md-4" key={i}>
            {/* <Link to={`/detail/${i}`}> */}
                <img src={`https://codingapple1.github.io/shop/shoes${i+1}.jpg`} onClick={()=>{ navigate('/detail/'+i); }} width="80%"/>
            {/* </Link> */}
            <h4>{shoeslist[i].title}</h4>
            <p>{shoeslist[i].content}</p>
            </div>
        )
        })
    )
}