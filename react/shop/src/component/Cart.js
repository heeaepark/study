import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addCount, changeName, increase, delItem } from './../store.js'

function Cart(){
  let state = useSelector((state)=>{return state});
  let dispatch = useDispatch();
  return(
    <div>
      <p>{state.user.name} {state.user.age}의 장바구니</p>
      <button onClick={()=>{dispatch(increase(10))}}>유저정보변경</button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제하기</th>
          </tr>
        </thead>
        <tbody>
          {
            state.cart.map(function(a, i){
              return(
                <tr key={i}>
                  <td>{state.cart[i].id}</td>
                  <td>{state.cart[i].name}</td>
                  <td>{state.cart[i].count}</td>
                  <td><button onClick={()=>{dispatch(addCount(state.cart[i].id))}}>+</button></td>
                  <td><button onClick={()=>{dispatch(delItem(state.cart[i].id))}}>삭제</button></td>
                </tr>
              )
            })
          }

        </tbody>
      </Table> 
    </div>
  )
}

export default Cart