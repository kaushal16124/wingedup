import React, { Component } from 'react'
import loading from '../assets/glider1.gif'

const Spinner = ()=> {
 
    return (
      <div className="text-center" >
        <img src={loading} style={{width:"150px", height:"150px"}} alt="loading"></img>
      </div>
    )
  
}

export default Spinner
