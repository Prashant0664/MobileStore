import React from 'react'
import CartCount from './cart/CartCount'
import CartEmpty from './cart/CartEmpty'
import CartItem from './cart/CartItem'
import {useDispatch,useSelector} from 'react-redux'
import { selectCartItems, selectCartState, setCloseCart, setClearCartItems, setGetTotals, selectTotalAmount, selectTotalQuantity  } from '../app/CartSlice'
import { toast } from "react-hot-toast";
import { Order} from '../app/CartSlice'
import { clearCart } from '../helpers'
// import { selectCartItems, selectCartState, setCloseCart } from '../app/CartSlice'

const Cart = () => {
  const totalAmount=useSelector(selectTotalAmount)
  const totalQ=useSelector(selectTotalQuantity)
  const dispatch=useDispatch();  //redux tool kit
  const ifCartState=useSelector(selectCartState)
  const cartItems=useSelector(selectCartItems)
  // const Order=useSelector(Order)
  const Orders=()=>{
    dispatch(Order())
}   

  const onCartToggle=()=>{
      dispatch(setCloseCart({
          cartState:false
      }))
  }
  React.useEffect(()=>{
    dispatch(setGetTotals())
  },[cartItems,dispatch])
  const onClearCart=async()=>{
    dispatch(setClearCartItems())
    await clearCart(localStorage.getItem("id"))

  }
  return (
    <div className={`z-[9999999] overflow-scroll fixed top-0 left-0 right-0 bottom-0 blur-effect-theme w-full h-screen opacity-100 z-[999999999] ${ifCartState?'opacity-100 visible translate-x-0 ':'opacity-0 invisible translate-x-8'}`}>
        <div className={`overflow-scroll blur-effect-theme opacity-100 h-screen max-w-xl w-full absolute right-0 `}>
        <CartCount totalQ={totalQ} onCartToggle={onCartToggle} onClearCart={onClearCart}/>
        {cartItems?.length===0?<CartEmpty onCartToggle={onCartToggle}/>:<div>
          <div >
            {cartItems?.map((item,i)=>(
              <CartItem key={i} item={item} />
            ))}
        </div>
        <div className="fixed bottom-0 bg-white w-full px-5 py-2 grid items-center">
              <div className="flex items-center justify-between">
                <h1 className="text-base font-semibold uppercase">SubTotal</h1>
                <h1 className="text-sm rounded bg-theme-cart text-slate-100 px-1 py-0.5">${totalAmount}</h1>
              </div>
              <div className="grid items-center gap-2">
                <p className="text-sm font-medium text-center">SHIPPING CHARGES WILL NOT BE INCLUDED ON ORDER ABOVE $800</p>
                <button type="button" className="button-theme bg-theme-cart text-white" onClick={Orders} >Check Out</button>
              </div>
            </div>
        </div>}
        </div>
    </div>
  )
}

export default Cart