import { Button, Navbar, Container, Nav, Row, Col} from 'react-bootstrap';

export default function Card(props){
    let shoeslist = props.shoes;
    return(
        shoeslist.map(function(a, i) {
        return(
            <div className="col-md-4" key={i}>
                <img src={`https://codingapple1.github.io/shop/shoes${i+1}.jpeg`} width="80%"/>
                <h4>{shoeslist[i].title}</h4>
                <p>{shoeslist[i].content}</p>
            </div>
        )
        })
    )
}