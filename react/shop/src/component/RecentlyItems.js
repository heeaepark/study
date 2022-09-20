import {useNavigate} from 'react-router-dom'

const RecentlyItem = function(props){
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

export {RecentlyItem}