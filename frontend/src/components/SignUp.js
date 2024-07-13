import React, { useState } from 'react'
import '../components/SignUp.css'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
    const {setProgress} = props;
    setProgress(0);

    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    setProgress(20);

    const handleSignup = async(e) => {
        setProgress(0);

        e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST_URI}/user/register`, {
      
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name:name ,email:email, password: password })
    });
    setProgress(30);

    const json = await response.json();
    setProgress(50);

    //console.log(json);
        //redirect
        if(json.success) {
          //redirect
          localStorage.setItem('token',json.accesstoken);
          setProgress(80);
          setProgress(100);

          navigate("/login")
          alert("Account created successfully")
        //   props.showAlert("Account created successfully","success")
      } else {
        alert("Invalid credentials")
        setProgress(100);

        //   props.showAlert("Invalid credentials","danger")
      }

    };

    setProgress(100);


    return (
        <div className="signup-container">
            <h2 className="signup-header">Sign Up</h2>
            <form onSubmit={handleSignup}>
            <input
                    className="signup-input"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    className="signup-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="signup-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    className="signup-input"
                    type="password"
                    name="cpassword"
                    placeholder="Confirm Password"
                   
                    
                    required
                />
                <input className="signup-submit" type="submit" value="Submit" />
            </form>
            
            <p className="login-text">Already have an account? <a className="login-link" href="/login">Log In</a></p>
        </div>
    )
}

export default SignUp
