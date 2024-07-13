import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import './ManageProducts.css';
import memberContext from '../context/members/memberContext';
import ProfileCardAdmin from './ProfileCardAdmin';
import Spinner from './Spinner';



const ManageMembers = (props) => {
  const { setProgress } = props;
  setProgress(0);
  setProgress(20);
  setProgress(30);
  setProgress(50);
  setProgress(80);
  setProgress(100);
  const context = useContext(memberContext);
  const { members, addMember, updateMember, setMembers, deleteMember, getMembers } = context;
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userformData, setFormData] = useState({
    name: '',
    age: '',
    exp: '',
    desc: '',
    instaUrl: '',
    whatsAppUrl: '',
    facebookUrl: ''
  });
  // const [euserformData, setEFormData] = useState({
  //   product_id: '',
  //   title: '',
  //   amount: 0,
  //   description: '',
  //   content: '',
  //   category: ''
  // });

  const [member, setMember] = useState({ id: "", ename: "", eage: "", eexp: "", edesc: "", einstaUrl: "", ewhatsAppUrl: "", efacebookUrl: "" })

  const ref = useRef(null)
  const refClose = useRef(null)


  useEffect(() => {
    getMembers();
    setMembers(members);
  }, [])

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    //console.log(name, value);
    setFormData({ ...userformData, [name]: value });
    //console.log(userformData);
  };

  const onChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value })
  }

  const updateMemberItem = (currentMember) => {
    ref.current.click();
    setMember({ id: currentMember._id, ename: currentMember.name, eage: currentMember.age,eexp: currentMember.exp, edesc: currentMember.desc, einstaUrl: currentMember.instaUrl, ewhatsAppUrl: currentMember.whatsAppUrl, efacebookUrl: currentMember.facebookUrl });

  }//Edit click handling
  const handleClick = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_HOST_URI}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('token')
        },

        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        }
      });

      setUploadSuccess(true);

      //console.log('Upload successful', response.data);
      alert('Image Upload successful')


      try {
        const isUpdated = await updateMember(member.id, member.ename, member.eage, member.eexp, member.edesc, response.data.url, member.einstaUrl, member.ewhatsAppUrl, member.efacebookUrl)

        if (isUpdated) {
          alert('Member updated!');
          setSelectedFile(null);
          setPreviewImage(null);
          refClose.current.click();
          alert('Updated Successfully!')


        } else {
          alert('Some error occurred');
        }
      } catch (error) {
        alert('Some error occurred while editing the member');
        console.error('Error adding member', error);
      }
    } catch (error) {
      // Handle error
      setUploadError(error.message);
      console.error('Error uploading image', error);
    }
    setLoading(false);

  }

  const handleUpload = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_HOST_URI}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('token')
        },

        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        }
      });
      setUploadProgress(50);

      // Handle success
      setUploadSuccess(true);
      setUploadProgress(100);
      //console.log('Upload successful', response.data);
      alert('Image Upload successful')

      // Now you can send productData to your backend to save the product details
      //console.log('Form Data:', userformData);
      const memberData = {
        name: userformData.name,
        age: userformData.age,
        exp: userformData.exp,
        desc: userformData.desc,
        profilePicUrl: response.data.url,
        instaUrl: userformData.instaUrl,
        whatsAppUrl: userformData.whatsAppUrl,
        facebookUrl: userformData.facebookUrl
      };

      //console.log('Member Data', memberData);
      try {
        const isAdded = await addMember(memberData.name, memberData.age, memberData.exp, memberData.desc, response.data.url, memberData.instaUrl, memberData.whatsAppUrl, memberData.facebookUrl);
        if (isAdded) {
          alert('Product live now!');
          setPreviewImage(null);
          setSelectedFile(null);
          setFormData({
            name: '',
            age: '',
            exp: '',
            desc: '',
            instaUrl: '',
            whatsAppUrl: '',
            facebookUrl: ''
          })
        } else {
          alert('Some error occurred');
        }
      } catch (error) {
        alert('Some error occurred while adding the member');
        console.error('Error adding member', error);
      }
    } catch (error) {
      // Handle error
      setUploadError(error.message);
      console.error('Error uploading image', error);
    }
    setLoading(false);
  };
  return (
    <>
      <div className="image-upload-container">
        <h3 style={{ fontFamily: 'cursive' }}>Add a Member</h3>
        <label>Member Profile Pic:</label>
        <input type="file" accept="image/*" onChange={handleFileInputChange} />
        {previewImage && (
          <div className="image-preview">
            <img src={previewImage} alt="Preview" />
          </div>
        )}
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" name="name" value={userformData.name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Age :</label>
          <input type="text" name="age" value={userformData.age} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Experience :</label>
          <input type="text" name="exp" value={userformData.exp} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea name="desc" value={userformData.desc} onChange={handleInputChange}></textarea>
        </div>
        <div className="form-group">
          <label>Instagram URL:</label>
          <input type="text" name="instaUrl" value={userformData.instaUrl} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>WhatsApp URL:</label>
          <input type="text" name="whatsAppUrl" value={userformData.whatsAppUrl} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Facebook URL:</label>
          <input type="text" name="facebookUrl" value={userformData.facebookUrl} onChange={handleInputChange} />
        </div>
        <button className="upload-button" onClick={handleUpload}>Upload</button>
        {loading && <Spinner />}
        {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
        {uploadSuccess && <div className="success-message">Upload successful!</div>}
        {uploadError && <div className="error-message">Error: {uploadError}</div>}
      </div>

      {/* Edit Member Modal */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Member</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className='container'>
              <input type="file" accept="image/*" onChange={handleFileInputChange} />
              <form>
                <div className="mb-3">
                  <label for="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="ename" value={member.ename} name="ename" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label for="age" className="form-label">Age</label>
                  <input type="text" className="form-control" id="eage" value={member.eage} name="eage" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label for="exp" className="form-label">Experience</label>
                  <input type="text" className="form-control" id="eexp" value={member.eexp} name="eexp" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label for="desc" className="form-label">Description</label>
                  <textarea type="text" className="form-control" id="edesc" value={member.edesc} name="edesc" onChange={onChange}></textarea>
                </div>
                <div className="mb-3">
                  <label for="instaUrl" className="form-label">Instagram URL</label>
                  <input type="text" className="form-control" id="einstaUrl" value={member.einstaUrl} name="einstaUrl" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label for="whatsAppUrl" className="form-label">WhatsApp URL</label>
                  <input type="text" className="form-control" id="ewhatsAppUrl" value={member.ewhatsAppUrl} name="ewhatsAppUrl" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label for="facebookUrl" className="form-label">Facebook URL</label>
                  <input type="text" className="form-control" id="efacebookUrl" value={member.efacebookUrl} name="efacebookUrl" aria-describedby="emailHelp" onChange={onChange} />
                </div>

              </form>
              {loading && <Spinner />}
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={member.ename.length < 5 || member.edesc.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Member</button>
            </div>
          </div>
        </div>
      </div>



      {/* Display All Rides for modification */}
      <div className="container">
        <div className="row mx-3 my-3">
          <h3 style={{ fontFamily: 'cursive' }}>Modify existing members</h3>
          {members.map((member) => {
            return <ProfileCardAdmin updateMemberItem={updateMemberItem} member={member} />
          })}
        </div>
      </div>
    </>
  )
}

export default ManageMembers
