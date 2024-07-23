import React, { useContext, useEffect, useState } from 'react'
import RideTypeCard from './RideTypeCard'
import rideContext from '../context/rides/rideContext';
import productContext from '../context/products/productContext';
import Footer from './Footer';
import Spinner from './Spinner'


const BookRide = (props) => {
  const {setProgress} = props;
  setProgress(0);
  const [loading,setLoading]=useState(true);

  // const context = useContext(rideContext);
  // const {rides, setRides, getRides} = context;
  const context = useContext(productContext);
  const {products, setProducts, getProducts} = context;
  useEffect(() => {
    getProducts().then(() => {
      setLoading(false);
      setProgress(100);
    });
  }, []);

  return (
    <>
      <div className="container-fluid d-flex flex-column min-vh-100">
      <div className="row mx-3 my-3">
      <h3 style={{fontFamily: 'cursive'}}>Available Rides</h3>
      {loading ? <Spinner /> :products.map((ride)=> {
        return <RideTypeCard ride={ride}/>
      })}
      </div>
      </div>
      <Footer/>
      </>


  )
}

export default BookRide
