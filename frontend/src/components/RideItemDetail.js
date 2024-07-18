import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Button } from '@mui/material';
// import Razorpay from 'razorpay';
import cartContext from '../context/cart/cartContext';
import Footer from './Footer';


const RideItemDetail = (props) => {
  const { setProgress } = props;
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);
  const context = useContext(cartContext);
  const { addItemToCart, updateCartItem } = context;
  const [cartBoxName, setCartBoxName] = useState("ADD TO CART");
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const ref = useRef(null)
  const refClose = useRef(null)
  const [visitor, setVisitor] = useState({ name: "", email: "", email: "", contact: "" })
  const navigate = useNavigate();
  const location = useLocation();
  const ride = location.state;
  setProgress(0);
  setProgress(20);
  setProgress(50);
  setProgress(100);

  const onChange = (e) => {
    setVisitor({ ...visitor, [e.target.name]: e.target.value })

  }

  const updateVisitorDetail = (currentVisitor) => {

    ref.current.click();
    // console.log
    setVisitor({ name: "", email: "", email: "", contact: "" });

  }

  const visitorcheckoutHandler = async (amount) => {

    refClose.current.click();

    const { data: { key } } = await axios.get(`${process.env.REACT_APP_BACKEND_HOST_URI}/api/getkey`)

    const { data: { order } } = await axios.post(`${process.env.REACT_APP_BACKEND_HOST_URI}/api/checkout`, {
      amount,
      visitorName: visitor.name,
    visitorEmail: visitor.email,
    visitorContact: visitor.contact,
    selectedDate,
    count,
    rideName : ride.title
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
        name: visitor.name,
        email: visitor.email,
        contact: visitor.contact
      },
      notes: {
        visitorName: visitor.name,
        visitorEmail: visitor.email,
        visitorContact: visitor.contact
      },
      theme: {
        "color": "#121212"
      }
    };

    const razor = new window.Razorpay(options);
    razor.open();
  }




  const checkoutHandler = async (amount) => {


    const { data: { key } } = await axios.get(`${process.env.REACT_APP_BACKEND_HOST_URI}/api/getkey`)

    const { data: { order } } = await axios.post(`${process.env.REACT_APP_BACKEND_HOST_URI}/api/checkout`, {
      amount
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
        name: "Suhant Thakur",
        email: "Sushant.Thakur@example.com",
        contact: "9999999999"
      },
      notes: {
        "address": "Razorpay Corporate Office"
      },
      theme: {
        "color": "#121212"
      }
    };

    const razor = new window.Razorpay(options);
    razor.open();
  }

  
  

  const addtocart = () => {
    setProgress(0);

    if (localStorage.getItem('token')) {

      setProgress(20);
      const isAdded = addItemToCart(ride._id, count, price, selectedDate);
      setProgress(40);
      if (isAdded) {
        setCartBoxName("ITEM ADDED TO CART")

        setTimeout(() => {
          setCartBoxName("ADD MORE"); // Change "New Value" to whatever you want
        }, 1000);
        let count1 = 0, price1 = 0;
        setCount(count1);
        setPrice(price1);
        //console.log({ user });
      } else {
        alert("Some error occured while adding!");
      }
      setProgress(100);

    } else {
      alert("Please login to access cart functionality!");
      setProgress(80);
      setProgress(100);
    }
  }





  // const [datetime12h, setDateTime12h] = useState(Date)

  const currentDate = new Date(); // Get current date
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const minTime = new Date();
  minTime.setHours(6, 0, 0); // Minimum time is 06:00 AM

  const maxTime = new Date();
  maxTime.setHours(16, 0, 0); // Maximum time is 04:00 PM




  useEffect(() => {
    setCount(count);
    setPrice(count * (ride.amount));
    setIsLogged(isLogged);
    setSelectedDate(selectedDate);
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
          //console.log(json);

          if (json.success) {
            setIsLogged(true);
            setUser(json.user);
            setCart(json.user.cart);
            //console.log(json.user);
          } else {
            alert("Invalid credentials")
          }




        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [count, ride.amount, selectedDate, localStorage.getItem('token')]);


  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
  };
  return (
    <>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Booking Details : </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className='container'>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" value={visitor.name} name="name" aria-describedby="emailHelp" onChange={onChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email :</label>
                  <input type="email" className="form-control" id="email" value={visitor.email} name="email" aria-describedby="emailHelp" onChange={onChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label">Contact :</label>
                  <input type="text" className="form-control" id="contact" value={visitor.contact} name="contact" aria-describedby="emailHelp" onChange={onChange} pattern="[0-9]*" title="Please enter only numbers" required />
                </div>
              </form>
              {/* {loading && <Spinner />} */}
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={visitor.name.length < 2 || visitor.email.length < 5 || visitor.contact.length !== 10} onClick={() => visitorcheckoutHandler(price)} type="button" className="btn btn-primary">Proceed to checkout</button>
            </div>
          </div>
        </div>
      </div>


      <div className='container-fluid d-flex flex-column min-vh-100 mx-2'>
        {/* <ReactPlayer url={location.state.youtubelink} width={250} height={250} /> */}
        <div className="card bg-transparent border-0 my-2">

          <div className="card-body">
            <h4 className="card-title">{ride.title}</h4>
            <p className="card-text">{ride.description}</p>
            <p className="card-text"><strong>Chargeable fare per person : </strong>₹{ride.amount}</p>
            {/* <Calendar value={datetime12h} onChange={(e) => setDateTime12h(e.value)} showTime hourFormat="12" showIcon /> */}


            <div className="counter my-2">
              <p className="my-2"><strong>No. of Flights</strong></p>
              <button className="btn" onClick={decrement}>-</button>
              <span className="count">{count}</span>
              <button className="btn" onClick={increment}>+</button>
            </div>

            <p className="card-text"><strong>Total Fare </strong>: <strong>₹{price}</strong> (including GST)</p>
            <div className="datetime-picker d-flex">
              <strong>Pick a Slot</strong>
              <DatePicker
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                minDate={currentDate} // Set min date as current date
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                minTime={minTime}
                maxTime={maxTime}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select Date & Time"
                className="date-picker"
              />
            </div>


            <div className='d-flex my-4'>
              <button className="add-to-cart-btn" onClick={addtocart}>{cartBoxName}</button>
              {/* <button className="buy-now-btn" onClick={() => price !== 0 && checkoutHandler(price)}>BUY NOW</button> */}
              <button className="buy-now-btn" onClick={() => price !== 0 && updateVisitorDetail(visitor)}>BUY NOW</button>
            </div>

          </div>

        </div>
      </div>
      <Footer/>
    </>
  )
}

export default RideItemDetail
