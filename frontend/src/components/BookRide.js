import React, { useContext, useEffect } from 'react'
import RideTypeCard from './RideTypeCard'
import rideContext from '../context/rides/rideContext';
import productContext from '../context/products/productContext';


const BookRide = (props) => {
  const {setProgress} = props;
  setProgress(0);

  // const context = useContext(rideContext);
  // const {rides, setRides, getRides} = context;
  const context = useContext(productContext);
  const {products, setProducts, getProducts} = context;
  useEffect(()=> {
    setProgress(50);
    getProducts();
    setProgress(70);
    setProducts(products);
    setProgress(100);
  },[])

  return (
      <div className="container">
      <div className="row mx-3 my-3">
      <h3 style={{fontFamily: 'cursive'}}>Available Rides</h3>
      {products.map((ride)=> {
        return <RideTypeCard ride={ride}/>
      })}
      </div>
      </div>

  )
}

export default BookRide
