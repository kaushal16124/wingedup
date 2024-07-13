import React, { useState } from 'react'
import '../components/ProfileCard.css'


const ProfileCard = (props) => {
    const { member } = props;
    const [isActive, setisActive] = useState(false);

    const ImageClick = () => {

        if (isActive) {
            setisActive(false);
        } else {
            setisActive(true);
        }

    }

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
            </div>

        </div>
    )
}

export default ProfileCard
