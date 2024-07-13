import React from 'react'
import bgVideo from '../assets/homeBG.mp4'

const Home = (props) => {
  const {setProgress} = props;
  setProgress(0);
  setProgress(10);
  setProgress(20);
  setProgress(30);
  setProgress(50);
  setProgress(70);
  setProgress(100);

  const handleCallButtonClick = () => {
    window.location.href = 'tel:+918084350810';
  };

  return (
    <>
      <div>
        <video autoPlay loop muted className="bg-vid" disablePictureInPicture>
          <source src={bgVideo} type="video/mp4" /> 
        </video>
      </div>
      <div className="get-wings-now" onClick={handleCallButtonClick}>
        <h1><strong>Get your wings now!</strong></h1>
        <h1><strong>Call +91 8084350810</strong></h1>
      </div>
    </>
  )
}

export default Home