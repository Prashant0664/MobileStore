import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// ---------------------------------------------------------------------------------------------------------

const initialState = {
  cartState: false,
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  tquantity:0,
  tcost:0,
}

// ---------------------------------------------------------------------------------------------------------

const CartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {

    setOpenCart: (state, action) => {
      // console.log(state.cartState,action.payload,action.payload.CartState)
      state.cartState = action.payload.cartState
    },

// ---------------------------------------------------------------------------------------------------------

    setCloseCart: (state, action) => {
      state.cartState = action.payload.cartState
    },

// ---------------------------------------------------------------------------------------------------------

    setAddItemToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1
        toast.success(`${action.payload.title} ADDED `, {
          style: {
            border: '1px solid blue',
            padding: '16px',
            color: 'blue',
          },
          iconTheme: {
            primary: 'blue',
            secondary: 'white',
          },
        });
      } else {
        const temp = { ...action.payload, cartQuantity: 1 }
        state.cartItems.push(temp)
        toast.success(`${action.payload.title} is ADDED to CART`, {
          style: {
            border: '1px solid blue',
            padding: '16px',
            color: 'blue',
          },
          iconTheme: {
            primary: 'blue',
            secondary: 'white',
          },
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      // console.log(JSON.parse(localStorage.getItem("cart")).length)
    },

// ---------------------------------------------------------------------------------------------------------

    setRemoveItemFromCart: (state, action) => {
      const removeItem = state.cartItems.filter((item) => item.id !== action.payload.id);
      state.cartItems = removeItem;

      localStorage.setItem("cart",JSON.stringify(state.cartItems));
      toast.success(`${action.payload.title} REMOVED from CART `, {
        style: {
          border: '1px solid blue',
          padding: '16px',
          color: 'blue',
        },
        iconTheme: {
          primary: 'blue',
          secondary: 'white',
        },
      });
    },

// ---------------------------------------------------------------------------------------------------------

    setIncreaseItemQTY:(state,action)=>{


      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1
        toast.success(`${action.payload.title} ADDED `, {
          style: {
            border: '1px solid blue',
            padding: '16px',
            color: 'blue',
          },
          iconTheme: {
            primary: 'blue',
            secondary: 'white',
          },
        });
      }
      localStorage.setItem("cart",JSON.stringify(state.cartItems));



    },

// ---------------------------------------------------------------------------------------------------------

    setDecreaseItemQTY:(state,action)=>{
      
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity>1) {
        state.cartItems[itemIndex].cartQuantity -= 1
        toast.success(`${action.payload.title} REMOVED `, {
          style: {
            border: '1px solid blue',
            padding: '16px',
            color: 'blue',
          },
          iconTheme: {
            primary: 'blue',
            secondary: 'white',
          },
        });
      }
      else{
        const removeItem = state.cartItems.filter((item) => item.id !== action.payload.id);
      state.cartItems = removeItem;

      localStorage.setItem("cart",JSON.stringify(state.cartItems));
      toast.success(`${action.payload.title} REMOVED from CART `, {
        style: {
          border: '1px solid blue',
          padding: '16px',
          color: 'blue',
        },
        iconTheme: {
          primary: 'blue',
          secondary: 'white',
        },
      });
      }
      localStorage.setItem("cart",JSON.stringify(state.cartItems));
    },

// ---------------------------------------------------------------------------------------------------------
    
    setClearCartItems:(state,action)=>{
      state.cartItems=[];
      toast.success(`YOUR CART IS NOW EMPTY :/ `, {
        style: {
          border: '1px solid blue',
          padding: '16px',
          color: 'blue',
        },
        iconTheme: {
          primary: 'blue',
          secondary: 'white',
        },});
        localStorage.setItem("cart",JSON.stringify(state.cartItems));

    },

    setGetTotals:(state,action)=>{
      let {totalAmount, totalQTY}=
      state.cartItems.reduce((cartTotal,cartItem)=>{
        const {price,cartQuantity}=cartItem
        const totalPrice=price*cartQuantity
        cartTotal.totalAmount+=totalPrice;
        cartTotal.totalQTY+=cartQuantity;
        return cartTotal; 
      },{
        totalAmount:0,
        totalQTY:0,
      })
      state.tcost=totalAmount;
      state.tquantity=totalQTY;
    },
    Order:(state,action)=>{
      toast.success(`THANK YOU FOR USING MY APP `, {
        style: {
          height:"100px",
          backgroundColor:"blue",
          border: '1px solid blue',
          padding: '16px',
          color:"white",
          fontWeight:"800",
        },
        iconTheme: {
          primary: 'white',
          secondary: 'green',
        },})
    }

  }
});

export const {Order,setGetTotals, setOpenCart, setCloseCart, setAddItemToCart, setRemoveItemFromCart, setIncreaseItemQTY, setDecreaseItemQTY, setClearCartItems } = CartSlice.actions;
export const selectCartState = (state) => state.cart.cartState
export const selectCartItems = (state) => state.cart.cartItems
export const selectTotalAmount = (state) => state.cart.tcost
export const selectTotalQuantity = (state) => state.cart.tquantity
export default CartSlice.reducer;