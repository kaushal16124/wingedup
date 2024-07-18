import React from 'react'
import page1 from '../assets/solo_course/page1.jpg'
import page2 from '../assets/solo_course/page2.jpg'
import page3 from '../assets/solo_course/page3.jpg'
import page4 from '../assets/solo_course/page4.jpg'
import page5 from '../assets/solo_course/page5.jpg'
import page6 from '../assets/solo_course/page6.jpg'
import page7 from '../assets/solo_course/page7.jpg'
import Footer from './Footer'


const Courses = (props) => {
  const { setProgress } = props;
  setProgress(0);
  setProgress(20);
  setProgress(30);
  setProgress(70);
  setProgress(100);
  return (
    <>
      <div className='container-fluid d-flex flex-column min-vh-100 my-3' style={{ width: "70%", height: "auto" }}>
      <div className="d-grid gap-2 my-2 justify-content-center">
          <a href="/Course_Structure.pdf" download>
            <button className="btn btn-success" type="button">Download Course Brochure</button>
          </a>
        </div>
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={page1} className="d-block w-100" alt="Solo Course Details" />
            </div>
            <div className="carousel-item">
              <img src={page2} className="d-block w-100" alt="Solo Course Details" />
            </div>
            <div className="carousel-item">
              <img src={page3} className="d-block w-100" alt="Solo Course Details" />
            </div>
            <div className="carousel-item">
              <img src={page4} className="d-block w-100" alt="Solo Course Details" />
            </div>
            <div className="carousel-item">
              <img src={page5} className="d-block w-100" alt="Solo Course Details" />
            </div>
            <div className="carousel-item">
              <img src={page6} className="d-block w-100" alt="Solo Course Details" />
            </div>
            <div className="carousel-item">
              <img src={page7} className="d-block w-100" alt="Solo Course Details" />
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
      <Footer/>
    </>
  )
}

export default Courses
