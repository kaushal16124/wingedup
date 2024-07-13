import { useSearchParams } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import orderContext from '../context/orders/orderContext';
import './Orders.css'

const PaymentSuccess = (props) => {
  const { setProgress } = props;
  const [orderDetails, setOrderDetails] = useState([]);
  setProgress(0);
  setProgress(20);

  const seachQuery = useSearchParams()[0]
  setProgress(70);

  const referenceNum = seachQuery.get("reference")
  setProgress(100);

  const context = useContext(orderContext);
  const { orders, setOrders, getOrders } = context;



  useEffect(() => {
    const fetchOrders = async () => {
      await getOrders(); // Fetch all orders from backend
      const myOrders = orders.filter(order => order.razorpay_order_id === referenceNum);
      setOrderDetails(myOrders);
    };

    fetchOrders();
  }, [referenceNum, getOrders]);

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

  if (orderDetails.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="receipt-container">
      <div className="receipt-header">
        <h1>Order Successful</h1>
        <p>Reference No. {referenceNum}</p>
      </div>
      {orderDetails.map((order, index) => (
        <div key={index} className="order-section">
          <h2>Order {index + 1}</h2>
          <ul className="receipt-details">
            <li><span>Ride Name :</span> <div>{order.rideName}</div></li>
            <li><span>Name :</span> <div>{order.visitorName}</div></li>
            <li><span>Email :</span> <div>{order.visitorEmail}</div></li>
            <li><span>Contact :</span> <div>{order.visitorContact}</div></li>
            <li><span>Selected Date :</span> <div>{formatDate(order.selectedDate)}</div></li>
            <li><span>No of Rides :</span> <div>{order.count}</div></li>
            <li><span>Price :</span> <div>₹{order.price}</div></li>
            <li><span>Status :</span> <div>{order.status}</div></li>
          </ul>
        </div>
      ))}
      <div className="receipt-footer">
        <p>Thank you for your purchase!</p>
      </div>
    </div>
  )
}

export default PaymentSuccess
