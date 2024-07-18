import React, { useContext, useEffect } from 'react'
import ProfileCard from './ProfileCard'
import member1 from '../assets/kaushal.jpeg'
import member2 from '../assets/pinkuadmin.jpg'
import memberContext from '../context/members/memberContext';
import Footer from './Footer'

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
  <>
    <div className='container-fluid d-flex flex-column min-vh-100 my-3'>
      <div className="row mx-3">
        <h3 style={{ fontFamily: 'cursive' }}>Team WingedUp</h3>
        {members.map((member) => {
          return <ProfileCard member={member} />
        })}
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default AboutUs
