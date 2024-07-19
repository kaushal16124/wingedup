import React, { useEffect, useState } from 'react'
import '../components/Login.css'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'


const Login = (props) => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setProgress } = props;
    setProgress(0);


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
            setProgress(30);
            const json = await response.json();
            setProgress(50);
            //console.log(json);
            if (json.success) {
                localStorage.setItem('token', json.accesstoken);
                window.location.href = "/"

                // navigate("/bookaride")
                props.showAlert("Login Successful", "success");
                //alert("Login Successful")

            } else {
                props.showAlert("Invalid credentials", "danger");
                //alert("Invalid credentials")

            }
        } catch (err) {
            console.error(err);
            props.showAlert("An error occurred while logging in", "danger");
            //alert("An error occurred while logging in");
        }
        setProgress(100);

    };



    const handleForgotPassword = () => {
        // Implement forgot password logic here
        props.showAlert("Password reset link will be sent to the registered email", "warning");
        //console.log('Forgot password clicked');
    };

    return (
        <>
            <div className="login-page-container">
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
            </div>
            <Footer className="login-footer" />
        </>
    )
}

export default Login
