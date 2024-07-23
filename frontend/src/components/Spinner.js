import React, { Component } from 'react'
import loading from '../assets/glider1.gif'

const Spinner = ()=> {
 
    return (
      <div className="text-center" >
        <img src={loading} style={{width:"300px", height:"300px"}} alt="loading"></img>
      </div>
    )
  
}

export default Spinner
