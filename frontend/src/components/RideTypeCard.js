import React from 'react'
import { useNavigate } from 'react-router-dom';
import ClassicRide from '../assets/ClassicRide.png'



const RideTypeCard = (props) => {
    const {ride} = props;
    const navigate = useNavigate();

    const goToBooking =()=> {
         navigate("/rideitemdetail", { state: ride });
    }
    return (
        <div className="col-md-4 my-2">
            <div className="card" style={{height : "700px"}}>
                <img src={ride.images.url} className="card-img-top" alt="..." style={{ height: "300px", objectFit: "cover", width: "100%" }}/>
                <div className="card-body">
                    <h5 className="card-title"><strong>{ride.title}</strong></h5>
                    <p className="card-text">{ride.description}</p>
                    <a className="btn btn-warning" style={{bottom:"20px", position: "absolute"}} onClick={goToBooking}>Check Availablity</a>
                   
                </div>
            </div>
        </div>
    )
}

export default RideTypeCard
