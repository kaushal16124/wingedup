import { useState } from "react"
import OrderContext from "./orderContext"

const OrderState = (props) => {
    const host = process.env.REACT_APP_BACKEND_HOST_URI;
    const initialOrder = []
    const [orders, setOrders] = useState(initialOrder)

    //Fetching all Orders
    const getOrders = async () => {
        const response = await fetch(`${host}/api/orders/fetchallorders`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });



        const res = await response.json()
        setOrders(res);
    }


    return (
        <OrderContext.Provider value={{ orders, setOrders, getOrders }}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderState;