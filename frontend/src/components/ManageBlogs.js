import React from 'react'

const ManageBlogs = (props) => {
  const {setProgress} = props;
  setProgress(0);
  setProgress(20);
  setProgress(30);
  setProgress(50);
  setProgress(80);
  setProgress(100);

  return (
    <div>
      Manage Blogs
    </div>
  )
}

export default ManageBlogs
