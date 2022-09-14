import { Button, Navbar, Container, Nav, Row, Col} from 'react-bootstrap';

export default function Card(props){
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