import { useState } from "react"
import CartContext from "./cartContext"

const CartState = (props) => {
    const host = process.env.REACT_APP_BACKEND_HOST_URI;
    const initialMember = []
    const [cart, setCart] = useState(initialMember)
    const [totalCartLength,setTotalCartLength] = useState(cart.length);

    //Fetching all Cart items
    const getCartItems = async () => {
        const response = await fetch(`${host}/user/getallcartitems`, {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });



        const res = await response.json()
        setCart(res.cart)
        setTotalCartLength(res.cart.length);
    }

    //Add item to cart
    const addItemToCart = async (product_id, count, price, selectedDate) => {
        let added=false;
        const response = await fetch(`${host}/user/addtocart`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem('token')
            },
            body: JSON.stringify({ product_id, count, price, selectedDate })
        });
        const res = await response.json()
        if(res.success){
            added=true;
            setCart(res.cart);
            setTotalCartLength(res.cart.length);
            // console.log(totalCartLength)
        }
        return added;
        
    }

    //Update Cart Item
    const updateCartItem = async (id, count, price, selectedDate) => {
        const response = await fetch(`${host}/user/updatecart/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem('token')
          },
          body: JSON.stringify({count, price, selectedDate}),
        });
        // return response.json();
      
    
        let newCart = JSON.parse(JSON.stringify(cart))
        for (let index = 0; index < newCart.length; index++) {
          const element = newCart[index];
          if (element._id == id) {
            newCart[index].count = count;
            newCart[index].price = price;
            newCart[index].selectedDate = selectedDate;
            break;
          }
        }
        setCart(newCart);
      }

    //DELETE item from cart
    const deleteItemFromCart = async (id) => {
        const response = await fetch(`${host}/user/removefromcart/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem('token')
            }
        });
        const res = await response.json()
        //console.log(res)
        setCart(res.cart)
        const newCart = cart.filter((item) => { return item.cartItem_id != id })
        setCart(newCart)
        setTotalCartLength(res.cart.length);
        //console.log("deleting cart item with" + id)

    }

    return (
        <CartContext.Provider value={{ cart, setCart, addItemToCart, updateCartItem,deleteItemFromCart, totalCartLength,setTotalCartLength, getCartItems }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartState;