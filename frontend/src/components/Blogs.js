import React, { useContext, useEffect } from 'react'
import blogContext from '../context/blogs/blogContext';
import { Carousel } from 'react-responsive-carousel';
import ReactPlayer from 'react-player';

const Blogs = (props) => {
  const { setProgress } = props;
  const context = useContext(blogContext);
  const { blogs, setBlogs, getBlogs } = context;
  setProgress(0);
  useEffect(() => {
    setProgress(50);
    getBlogs();
    setProgress(70);
    setBlogs(blogs);
    setProgress(100);
  }, [])

 
  return (
    <div className='container'>
      {blogs.map(blog => (
        <div key={blog._id} className="blog-card" style={{ borderBottom: '5px solid #68ba85', paddingBottom: '20px', paddingTop: '20px' }}>

          <h2 className="text-center" style={{ fontFamily: 'Arial, sans-serif', color: '#1c693f', fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>{blog.title}</h2>

          <p className="text-center" style={{ fontFamily: 'Georgia, sans-serif', color: '#1c2f38', fontSize: '16px',  marginBottom: '20px' }}>Published on <strong>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong> by <strong>{blog.author}</strong> at {new Date(blog.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>

          <div id={`carousel-images-${blog._id}`} className="carousel slide" data-bs-ride="carousel" data-bs-interval="2500">
            <div className="carousel-inner">
              {blog.images.map((image, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img src={image} className="d-block mx-auto w-50" alt={`Image ${index + 1}`} />
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-images-${blog._id}`} data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#carousel-images-${blog._id}`} data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <p style={{ textAlign: 'justify', fontFamily: 'Arial, sans-serif', color: '#444444', fontSize: '20px', lineHeight: '1.8', marginBottom: '20px', marginTop: '20px' }}>{blog.description}</p>

          <div className="mt-3">
            <div id={`carousel-videos-${blog._id}`} className="carousel slide" data-bs-ride="carousel" data-bs-interval="2500">
              <div className="carousel-inner">
                {blog.videos.map((video, index) => (
                  <div key={index} className={`carousel-item justify-content-center ${index === 0 ? 'active' : ''}`}>
                    <ReactPlayer
                      url={video}
                      width="60%"
                      height="400px"
                      className="mx-auto"
                      controls={true}
                    />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-videos-${blog._id}`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target={`#carousel-videos-${blog._id}`} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

        </div>

      ))}
    </div>
  );
}

export default Blogs
