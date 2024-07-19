import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import './ManageProducts.css';
import productContext from '../context/products/productContext';
import RideTypeCard from './RideTypeCard';
import RideTypeAdmin from './RideTypeAdmin';
import Spinner from './Spinner';



const ManageProducts = (props) => {
  const { setProgress } = props;
  setProgress(0);
  setProgress(20);
  setProgress(30);
  setProgress(50);
  setProgress(80);
  setProgress(100);
  const context = useContext(productContext);
  const { products, setProducts, updateProduct, getProducts, addProduct } = context;
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userformData, setFormData] = useState({
    product_id: '',
    title: '',
    amount: 0,
    description: '',
    content: '',
    category: ''
  });
  const [euserformData, setEFormData] = useState({
    product_id: '',
    title: '',
    amount: 0,
    description: '',
    content: '',
    category: ''
  });

  const [product, setProduct] = useState({ id: "", etitle: "", eamount: 0, edescription: "", econtent: "", ecategory: "" })

  const ref = useRef(null)
  const refClose = useRef(null)


  useEffect(() => {
    getProducts();
    setProducts(products);
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
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const updateProductItem = (currentProduct) => {
    ref.current.click();
    setProduct({ id: currentProduct._id, etitle: currentProduct.title, eamount: currentProduct.amount, edescription: currentProduct.description, econtent: currentProduct.content, ecategory: currentProduct.category });

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
      props.showAlert("Image Upload successful", "success");
      //alert('Image Upload successful')


      try {
        const isUpdated = await updateProduct(product.id, product.etitle, product.eamount, product.edescription, product.econtent, response.data, product.ecategory)

        if (isUpdated) {
          props.showAlert("Product updated!", "success");
          //alert('Product updated!');
          setSelectedFile(null);
          setPreviewImage(null);
          refClose.current.click();
          props.showAlert("Updated Successfully!", "success");
          //alert('Updated Successfully!')


        } else {
          props.showAlert("Some error occurred", "danger");
          //alert('Some error occurred');
        }
      } catch (error) {
        props.showAlert("Some error occurred while editing the member", "danger");
        //alert('Some error occurred while editing the product');
        console.error('Error adding product', error);
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
      props.showAlert("Image Upload successful", "success");
      //alert('Image Upload successful')

      // Now you can send productData to your backend to save the product details
      //console.log('Form Data:', userformData);
      const productData = {
        product_id: userformData.product_id,
        title: userformData.title,
        amount: userformData.amount,
        description: userformData.description,
        content: userformData.content,
        category: userformData.category,
        images: response.data
      };

      //console.log('Product Data', productData);
      try {
        const isAdded = await addProduct(productData.product_id, productData.title, productData.amount, productData.description, productData.content, productData.images, productData.category);
        if (isAdded) {
          props.showAlert("Product live now!", "success");
          //alert('Product live now!');
          setPreviewImage(null);
          setSelectedFile(null);
          setFormData({
            product_id: '',
            title: '',
            amount: 0,
            description: '',
            content: '',
            category: ''
          })
        } else {
          props.showAlert("Some error occurred", "danger");
          //alert('Some error occurred');
        }
      } catch (error) {
        props.showAlert("Some error occurred while adding the member", "danger");
        //alert('Some error occurred while adding the product');
        console.error('Error adding product', error);
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
        <h3 style={{ fontFamily: 'cursive' }}>Add a Ride</h3>
        <label>Product Image:</label>
        <input type="file" accept="image/*" onChange={handleFileInputChange} />
        {previewImage && (
          <div className="image-preview">
            <img src={previewImage} alt="Preview" />
          </div>
        )}
        <div className="form-group">
          <label>Product ID:</label>
          <input type="text" name="product_id" value={userformData.product_id} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title" value={userformData.title} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Set Fare:</label>
          <input type="number" name="amount" value={userformData.amount} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={userformData.description} onChange={handleInputChange}></textarea>
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea name="content" value={userformData.content} onChange={handleInputChange}></textarea>
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input type="text" name="category" value={userformData.category} onChange={handleInputChange} />
        </div>
        <button className="upload-button" onClick={handleUpload}>Upload</button>
        {loading && <Spinner />}
        {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
        {uploadSuccess && <div className="success-message">Upload successful!</div>}
        {uploadError && <div className="error-message">Error: {uploadError}</div>}
      </div>

      {/* Edit Ride Modal */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Ride</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className='container'>
              <input type="file" accept="image/*" onChange={handleFileInputChange} />
              <form>
                <div className="mb-3">
                  <label for="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" value={product.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label for="amount" className="form-label">Amount</label>
                  <input type="number" className="form-control" id="eamount" value={product.eamount} name="eamount" aria-describedby="emailHelp" onChange={onChange} />
                </div>

                <div className="mb-3">
                  <label for="description" className="form-label">Description</label>
                  <textarea type="text" className="form-control" id="edescription" value={product.edescription} name="edescription" onChange={onChange}></textarea>
                </div>
                <div className="mb-3">
                  <label for="content" className="form-label">Content</label>
                  <input type="text" className="form-control" id="econtent" value={product.econtent} name="econtent" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label for="category" className="form-label">Category</label>
                  <input type="text" className="form-control" id="ecategory" value={product.ecategory} name="etag" onChange={onChange} />
                </div>

              </form>
              {loading && <Spinner />}
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={product.etitle.length < 5 || product.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Product</button>
            </div>
          </div>
        </div>
      </div>



      {/* Display All Rides for modification */}
      <div className="container">
        <div className="row mx-3 my-3">
          <h3 style={{ fontFamily: 'cursive' }}>Modify existing rides</h3>
          {products.map((ride) => {
            return <RideTypeAdmin updateProductItem={updateProductItem} ride={ride} />
          })}
        </div>
      </div>
    </>
  )
}

export default ManageProducts
