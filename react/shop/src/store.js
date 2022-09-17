import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name: 'user',
  initialState: {name: 'kim', age: 20},
  reducers: {
    changeName(state){
      state.name = 'park';
    },
    increase(state, action){
      state.age += action.payload;
    }
  }
})


let cart = createSlice({
  name: 'cart',
  initialState: [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers: {
    addCount(state, action){
      let num = state.findIndex((a) => {
        return a.id === action.payload
      }) 
      state[num].count++;
    },
    delItem(state, action){
      let num = state.findIndex((a) => {
        return a.id === action.payload
      })
      state.splice(num, 1);
    },
    addItem(state, action){
      let num = state.findIndex((a) => {
        return a.id === action.payload.id
      })
      console.log(num)
      if(num >= 0) {
        state[num].count+=1;
      } else {
        state.push(action.payload)
      }

      /* console.log(num)
      state.push(action.payload) */
    }
  }
});

export default configureStore({
  reducer: { 
    user: user.reducer,
    cart: cart.reducer,
  }
})
export let {changeName, increase} = user.actions
export let {addCount, delItem, addItem} = cart.actions