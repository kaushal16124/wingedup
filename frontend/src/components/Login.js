import React, { useEffect, useState } from 'react'
import '../components/Login.css'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setProgress} = props;
    setProgress(0);
    setProgress(10);
    setProgress(20);
    setProgress(30);
    setProgress(50);
    setProgress(70);
    setProgress(100);


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST_URI}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email, password: password })
            });
            const json = await response.json();
            //console.log(json);
            if (json.success) {
                //redirect
               // console.log('logged in');
                
                localStorage.setItem('token', json.accesstoken);
              
                
                window.location.href = "/"
                // navigate("/bookaride")
                alert("Login Successful")
                // props.showAlert("Login Successful","success")
            } else {
                alert("Invalid credentials")
                // props.showAlert("Invalid credentials","danger")
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while logging in");
        }


    };

    

    const handleForgotPassword = () => {
        // Implement forgot password logic here
        //console.log('Forgot password clicked');
    };

    return (
        <div className="login-container">
            <h2 className="login-header">Log In</h2>
            <form onSubmit={handleLogin}>
                <input
                    className="login-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="login-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input className="login-submit" type="submit" value="Login" />
            </form>
            <a className="forgot-password" href="#" onClick={handleForgotPassword}>Forgot password?</a>
            <p className="signup-text">Not registered? <a className="signup-link" href="/signup">Sign Up</a></p>
        </div>
    )
}

export default Login
