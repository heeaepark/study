import {useNavigate} from 'react-router-dom'

export default function RecentlyItem (props){
  let navigate = useNavigate();
  let recentlyStorage = JSON.parse(localStorage.getItem('watched'));
  let shoesList = props.shoes;
      
  if(localStorage.getItem('watched') != null) {
    recentlyStorage.map((a, i)=>{
      return(
        <div className="recently-item" key={i}>
          <img src={`https://codingapple1.github.io/shop/shoes${a+1}.jpg`} onClick={()=>{ navigate('/detail/'+a) }} width="80%"/>
          <p>{shoesList[a].title}</p>
        </div>
      )
    })
  }
      

  
}
