import React, { useContext, useState } from 'react'
import productContext from '../context/products/productContext';
import ConfirmationModal from './ConfirmationModal';
import Spinner from './Spinner';

const RideTypeAdmin = (props) => {
    const { ride, updateProductItem } = props;
    const context = useContext(productContext);
    const { deleteProduct } = context;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);
        //console.log('inside function')

        const isDeleted = deleteProduct(ride._id);
        if (isDeleted) {
            props.showAlert("Deleted Successfully", "success");
            //alert("Deleted Successfully");
            setIsModalOpen(false);
        } else {
            props.showAlert("Some error occurred", "danger");
            //alert("Some error occurred");
        }
        setIsModalOpen(false);
        setLoading(false);

    };


    return (
        <>
        {loading && <Spinner/>}
        <div className="col-md-4 my-2">

            <div className="card" style={{ height: "600px" }}>
                <img src={ride.images.url} className="card-img-top" alt="..." />
                <div className="card-body" >
                    <h5 className="card-title"><strong>{ride.title}</strong></h5>
                    <p className="card-text">{ride.description}</p>
                    <div style={{ position: "absolute", bottom: "10px", left: "15%", transform: "translateX(-50%)", display: "flex" }}>
                        <a className='mx-2 my-2' style={{ position: "relative" }} onClick={() => {
                            updateProductItem(ride)
                        }}><i className="fa-regular fa-pen-to-square fa-xl"></i></a>
                        <a className='mx-2 my-2' style={{ position: "relative" }} onClick={() => {
                            //console.log('clicked');
                            setIsModalOpen(true)
                            //console.log(isModalOpen)
                        }                        
                        }><i class="fa-solid fa-delete-left fa-xl"></i></a>
                    </div>
                </div>
            </div>
            <ConfirmationModal
                isOpen={isModalOpen}
                message="Are you sure you want to delete?"
                onConfirm={handleDelete}
                onCancel={() => {
                    //console.log(isModalOpen);
                    setIsModalOpen(false)}}
            />
        </div>
        </>
    )
}

export default RideTypeAdmin
