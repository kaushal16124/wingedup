import React, { useContext, useEffect, useState } from 'react'
import orderContext from '../context/orders/orderContext';
import './Orders.css'

const ManageOrders = (props) => {

    const { setProgress } = props;
    setProgress(0);

    const context = useContext(orderContext);
    const { orders, setOrders, getOrders } = context;
    const [user, setUser] = useState([]);

    useEffect(() => {
        getOrders();
        setOrders(orders);
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

                        setUser(json.user);
                    } else {
                        alert("Invalid credentials")
                    }

                } catch (err) {
                    alert(err.response.data.msg);
                }
            };
            getUser();
        }
    }, [localStorage.getItem('token')]);

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

    return (
        <div className="containerOrder my-3 mz-3">
            <div className="row mx-3 my-3">
                <h3 style={{ fontFamily: 'cursive', marginBottom: '20px' }}>Upcoming Bookings</h3>
                {orders.length > 0 ? orders.map((order) => (
                    <div key={order._id} className="order-card">
                        <div className="order-header">
                            <p><strong>Order ID:</strong> {order.razorpay_order_id}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                        </div>
                        <div className="order-details">
                            {/* <p><strong>Visitor Name:</strong> {order.visitorName}</p>
                    <p><strong>Visitor Email:</strong> {order.visitorEmail}</p>
                    <p><strong>Visitor Contact:</strong> {order.visitorContact}</p> */}

                            <p><strong>Product Availed :</strong> {order.productName || order.rideName}</p>
                            <p><strong>Scheduled Visit on :</strong> {formatDate(order.selectedDate)}</p>
                            <p><strong>No of Rides :</strong> {order.count}</p>
                            <p><strong>Amount :</strong> ₹{order.price}</p>
                        </div>
                    </div>
                )) : <p>No orders found.</p>}
            </div>
        </div>
    )
}

export default ManageOrders
