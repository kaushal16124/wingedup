import React, { useContext, useEffect } from 'react'
import ProfileCard from './ProfileCard'
import member1 from '../assets/kaushal.jpeg'
import member2 from '../assets/pinkuadmin.jpg'
import memberContext from '../context/members/memberContext';


const AboutUs = (props) => {
  const {setProgress} = props;
  const context = useContext(memberContext);
  const { members, setMembers, getMembers } = context;
  setProgress(0);
    setProgress(10);
    setProgress(20);
    setProgress(30);
    
  useEffect(() => {
    getMembers();
    setMembers(members);
    setProgress(50);
    setProgress(100);

  }, [])
  return (
    // <>
    // <div className='row mx-3'>
    //   <div className='col-md-4 my-2'>
    // <ProfileCard name="Sushant Thakur" age="28" experience="1 yr" description="bla bla hsajajajdasdasda" imageName={member1} instaUrl="https://www.instagram.com/altitudeseekness/" whatsAppUrl="https://www.instagram.com/altitudeseekness/" facebookUrl="https://www.instagram.com/altitudeseekness/"/>
    // </div>
    // <div className='col-md-4 my-2'>
    // <ProfileCard name="Rajeev Thakur" age="31" experience="3 yrs" description="bla bla hsajajajdasdasda" imageName={member2} instaUrl="https://www.instagram.com/altitudeseekness/" whatsAppUrl="https://www.instagram.com/altitudeseekness/" facebookUrl="https://www.instagram.com/altitudeseekness/"/>
    // </div>
    // <div className='col-md-4 my-2'>
    // <ProfileCard name="Akshay Thakur" age="31" experience="3 yrs" description="bla bla hsajajajdasdasda" imageName={member1} instaUrl="https://www.instagram.com/altitudeseekness/" whatsAppUrl="https://www.instagram.com/altitudeseekness/" facebookUrl="https://www.instagram.com/altitudeseekness/"/>
    // </div>
    // </div>
    // </>

    <div className='container my-3'>
      <div className="row mx-3">
        <h3 style={{ fontFamily: 'cursive' }}>Team WingedUp</h3>
        {members.map((member) => {
          return <ProfileCard member={member} />
        })}
      </div>
    </div>
  )
}

export default AboutUs
