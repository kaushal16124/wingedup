import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import cartContext from '../context/cart/cartContext';
import sampleimage from '../assets/ClassicRide.png';
import './CartPage.css';
import emptyCart from "../assets/emptyCart.png";
import axios from 'axios';
import productContext from '../context/products/productContext';
import Footer from './Footer'

const Cart = (props) => {
  const { setProgress } = props;
  setProgress(0);
  setProgress(20);
  setProgress(30);
  setProgress(50);
  setProgress(100);

  const context = useContext(cartContext);
  const { cart, setCart, getCartItems, deleteItemFromCart } = context;

  const pcontext = useContext(productContext);
  const { products, setProducts, getProducts } = pcontext;

  const [isLogged, setIsLogged] = useState(false);

  const [user, setUser] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  function formatDate(dateString) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight

    const suffix = getDaySuffix(day);
    const formattedDate = `${day}${suffix} ${month}, ${year} at ${hours}:${minutes.toString().padStart(2, '0')}${ampm}`;

    return formattedDate;
  }

  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }



  const calculateCartTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    setCartTotal(total);
  }

  const checkoutHandler = async (amount) => {

    const { data: { key } } = await axios.get(`${process.env.REACT_APP_BACKEND_HOST_URI}/api/getkey`)

    const cartWithProductNames = cart.map(item => ({
      ...item,
      productName: products.find(product => product._id === item.product_id)?.title || 'Unknown Product'
    }));

    const { data: { order } } = await axios.post(`${process.env.REACT_APP_BACKEND_HOST_URI}/api/checkout`, {
      amount,
      cart: cartWithProductNames, // Include the cart in the request body
      visitorName: user.name,
      visitorEmail: user.email,
      visitorContact: "8084350810"
    })

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "WingedUp",
      description: "Payment Gateway for WingedUp",
      image: "https://res.cloudinary.com/insanebastard/image/upload/v1710825062/test/uvryxivgtdiue4bnfa4g.png",
      order_id: order.id,
      callback_url: `${process.env.REACT_APP_BACKEND_HOST_URI}/api/paymentverification`,
      prefill: {
        name: user.name,
        email: user.email,
        contact: "9999999999"
      },
      notes: {
        "address": "WingedUp Bir Billing"
      },
      theme: {
        "color": "#121212"
      }
    };

    const razor = new window.Razorpay(options);
    razor.open();
  }


  useEffect(() => {
    setIsLogged(isLogged);
    calculateCartTotal();
    getProducts();
    setProducts(products);
    let token = localStorage.getItem('token')
    if (token) {
      const getUser = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST_URI}/user/info`, {

            method: "GET",
            headers: {
              Authorization: token
            }
          });

          const json = await response.json();
          // console.log(json);

          if (json.success) {
            setIsLogged(true);
            setUser(json.user);
            setCart(json.user.cart)
            // console.log(json.user);
          } else {
            props.showAlert("Invalid credentials", "danger")
            //alert("Invalid credentials")
          }




        } catch (err) {
          props.showAlert(err.response.data.msg, "danger")
          //alert(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [localStorage.getItem('token'), cart]);

  const loggedInRouter = () => {
    return (

      <>
        <h4 style={{ marginLeft: "18px" }}>{user.name}'s Cart</h4>
        <div className='cart-container'>
          {cart.map((item, index) => (


            <div className="cart-item" key={index}>

              <div className="image-container">

                <img src={products.find(product => product._id === item.product_id)?.images.url || sampleimage} alt="Classic Ride" className="product-image" />
              </div>
              <div className="item-details">
                <div className="d-flex mb-3">
                  <h3 className="product-name">{products.find(product => product._id === item.product_id)?.title || 'Paragliding Ride'}</h3>

                  <a className='ms-auto' style={{ cursor: "pointer" }} onClick={() => {
                    deleteItemFromCart(item.cartItem_id);
                    setCart(cart);
                    // alert("Deleted Successfully", "success")
                  }}><i className="fa-solid fa-trash-can fa-lg " style={{ color: "#400080" }}></i></a>
                  {/* <button className="remove-btn " onClick={{}}>×</button> */}

                </div>

                <div className="booking-details">
                  <p className="quantity"><strong>Quantity: </strong>{item.count}</p>
                  <p className="total-price"><strong>Item Total: </strong>₹{item.price}</p>
                  <p className="booking-date"><strong>Date of Booking: </strong>{formatDate(item.selectedDate)}</p>
                </div>

              </div>
            </div>
          ))}
        </div>
        {cartTotal !== 0 && (
          <div className="checkout-box">
            <div className="checkout-summary">
              <h3>Total: ₹{cartTotal}</h3>
              <button className="btn btn-primary btn-lg" onClick={() => checkoutHandler(cartTotal)}>Proceed to Checkout</button>
            </div>
          </div>

        )}
      </>
      //   <>
      //     <h2>{user.name}</h2>
      //     <h2>Cart items : </h2>
      //     <div className='container'>
      //   <div className="row mx-3">

      //     {cart.map((item) => {
      //       return <h6>{item.product_id} - {item.count} - {item.price} - {item.selectedDate}</h6>
      //     })}
      //   </div>
      // </div>

      //   </>
    )
  }

  const loggedOutRouter = () => {
    return (
      <>
        {/* <h2 style={{ textAlign: "center" }}>Please login first</h2> */}
        <div className="parent-container">

          <div className="content">
            <>

              <img src={emptyCart} alt="Empty Cart" style={{ width: '350px' }} />
            </>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
    <div className='container-fluid d-flex flex-column min-vh-100'>
      {
        isLogged ? loggedInRouter() : loggedOutRouter()
      }

    </div>
    <Footer/>
    </>
  )
}

export default Cart
