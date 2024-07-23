import React, { useContext, useEffect, useState } from 'react'
import ProfileCard from './ProfileCard'
import member1 from '../assets/kaushal.jpeg'
import member2 from '../assets/pinkuadmin.jpg'
import memberContext from '../context/members/memberContext';
import Footer from './Footer'
import './AboutUs.css'
import image1 from '../assets/ClassicRide.png'
import image2 from '../assets/Premium.png'
import image3 from '../assets/XC.png'
import Spinner from './Spinner'

const AboutUs = (props) => {
  const {setProgress} = props;
  const context = useContext(memberContext);
  const { members, setMembers, getMembers } = context;
  const [loading,setLoading]=useState(true);
  setProgress(0);
    setProgress(10);
    setProgress(20);
    setProgress(30);
    
  useEffect(() => {
    getMembers().then(() => {
      setLoading(false);
      setProgress(100);
    });

  }, [])
  return (
  <>
  <div className="about-us my-2">
      <h1>About WingedUp</h1>
      <p>Welcome to WingedUp, your premier paragliding company located in the picturesque Bir Billing, Himachal Pradesh.</p>
      <p>At WingedUp, we pride ourselves on providing an exceptional user experience with our team of skilled pilots. Our goal is to ensure you have a safe and exhilarating flight.</p>
      <p>We also offer solo paragliding training and are recognized as a top-rated institute in the field. Whether you’re looking to soar through the skies or learn the art of paragliding, WingedUp is here to help you achieve your dreams.</p>

      <h2>Life at WingedUp</h2>
      <div className="carousel-container d-flex justify-content-center">
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
          <div className="carousel-inner">
            <div className="carousel-item active">
            <div>
              <img src={image1}  alt="Life at WingedUp" />
              </div>
            </div>
            <div className="carousel-item">
            <div>
              <img src={image2}  alt="Life at WingedUp" />
              </div>
            </div>
            <div className="carousel-item">
            <div>
              <img src={image3}  alt="Life at WingedUp" />
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        </div>
    </div>
    <div className='container-fluid d-flex flex-column min-vh-100 my-3'>
      <div className="row mx-3">
        <h3 style={{ fontFamily: 'cursive' }}>Team WingedUp</h3>
        {loading ? <Spinner /> :members.map((member) => {
          return <ProfileCard member={member} />
        })}
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default AboutUs
