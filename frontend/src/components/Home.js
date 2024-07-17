import React from 'react'
import bgVideo from '../assets/BGhome.mp4'
import bgVideoMobile from '../assets/homeMobBG.mp4'
import Footer from './Footer';

const Home = (props) => {
  const { setProgress } = props;
  setProgress(0);
  setProgress(10);
  setProgress(20);
  setProgress(30);
  setProgress(50);
  setProgress(70);
  setProgress(100);

  return (
    <>
      <div>
        <video autoPlay loop muted className="bg-vid" disablePictureInPicture>
        <source src={bgVideo} type="video/mp4" media="screen and (min-width: 768px)" />
        <source src={bgVideoMobile} type="video/mp4" media="screen and (max-width: 767px)" />
        </video>
      </div>
      {/* <div className="get-wings-now">
        <h1><strong>Get your wings now!</strong></h1>
        <h1><strong>Call +91 8084350810</strong></h1>
      </div> */}
      <Footer />
    </>
  )
}

export default Home