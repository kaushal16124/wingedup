import { useState } from "react"
import RideContext from "./rideContext"

const RideState = (props) => {
    const host = process.env.REACT_APP_BACKEND_HOST_URI;
    const initialRide = []
    const [rides, setRides] = useState(initialRide)

//Fetching all Rides
    const getRides = async () => {
        const response = await fetch(`${host}/api/ride/fetchallrides`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });



        const res = await response.json();
        //console.log(res)
        setRides(res);
    }

    return (
        <RideContext.Provider value={{ rides, setRides, getRides }}>
            {props.children}
        </RideContext.Provider>
    )
}

export default RideState;