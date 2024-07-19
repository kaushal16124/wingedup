import React, { useContext, useState } from 'react'
import '../components/ProfileCard.css'
import memberContext from '../context/members/memberContext';
import ConfirmationModal from './ConfirmationModal';



const ProfileCard = (props) => {
    const [isActive, setisActive] = useState(false);
    const { member, updateMemberItem } = props;
    const context = useContext(memberContext);
    const { deleteMember } = context;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const ImageClick = () => {

        if (isActive) {
            setisActive(false);
        } else {
            setisActive(true);
        }

    }

    const handleDelete = () => {
        setLoading(true);
        //console.log('inside function')

        const isDeleted = deleteMember(member._id);
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
        <div className="col-md-4 my-2">
            <div className={`card1 ${isActive ? "black" : ""}`}>
                <div className={`top_part ${isActive ? "font_icons" : ""}`}>

                    <div className="d-flex icons">
                        <i onClick={ImageClick} className="fa fa-moon-o"></i>
                        {/* <i className="fa fa-ellipsis-v"></i> */}
                    </div>
                </div>

                <div className="circle">
                    <span><img src={member.profilePicUrl} /></span>
                    <h3>{member.name}</h3>
                    
                    {/* <h6>{member.age}</h6> */}
                </div>
                <div className="fbox">
                        <span style={{fontSize:"16px"}}><strong>Age : </strong>{member.age}</span>
                        <span style={{fontSize:"16px"}}><strong>Exp : </strong>{member.exp}</span>
                    </div>
                <p style={{fontFamily : "monospace"}}>{member.desc} </p>
                


                <div className="social">
                
                    <a href={member.facebookUrl} target='_blank'><i className="fa fa-facebook"></i></a>
                    <a href={member.instaUrl} target='_blank'><i className="fa fa-instagram"></i></a>
                    <a href={member.whatsAppUrl} target='_blank'><i className="fa fa-whatsapp"></i></a>
                </div>
                <div style={{ position: "absolute", bottom: "10px", left: "15%", transform: "translateX(-50%)", display: "flex" }}>
                        <a className='mx-2 my-2' style={{ position: "relative" }} onClick={() => {
                            updateMemberItem(member)
                        }}><i className="fa-regular fa-pen-to-square fa-xl"></i></a>
                        <a className='mx-2 my-2' style={{ position: "relative" }} onClick={() => {
                            //console.log('clicked');
                            setIsModalOpen(true)
                            //console.log(isModalOpen)
                        }                        
                        }><i class="fa-solid fa-delete-left fa-xl"></i></a>
                    </div>
            </div>
            <ConfirmationModal
                isOpen={isModalOpen}
                message={`Are you sure you want to delete ${member.name}'s profile?`}
                onConfirm={handleDelete}
                onCancel={() => {
                    //console.log(isModalOpen);
                    setIsModalOpen(false)}}
            />
        </div>
    )
}

export default ProfileCard
