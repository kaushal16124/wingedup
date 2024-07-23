import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logoWingedUp.png'
import axios from 'axios';
import cartContext from '../context/cart/cartContext';


const Navbar = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const context = useContext(cartContext);
  // const {totalCartLength,setTotalCartLength } = context;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const adminRouter = () => {
    return (
      <>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/manageproducts">Products</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/managemembers">Members</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/manageblogs">Manage Blogs</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/manageorders">Manage Orders</a>
        </li>

      </>
    )
  }

  const userRouter = () => {
    return (
      <>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/bookaride">Book a Ride</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/courses">Courses</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/blogs">Blogs</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/aboutus">About Us</a>
        </li>
        {/* <li className="nav-item dropdown">
          <a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}
      </>
    )
  }
  const logoutUser = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_HOST_URI}/user/logout`)

    localStorage.clear()
    setIsAdmin(false)
    setIsLogged(false)
    window.location.href = "/"
  }

  const loggedInRouter = () => {
    return (
      <>
        {/* <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/getorders">Orders</a>
        </li>
        <div className="d-flex align-items-center">
          <span style={{ marginRight: '10px' }}>Welcome, {user.name}</span>
          <a className="btnLogin btn-outline-danger" onClick={logoutUser} style={{ textDecoration: 'none', backgroundColor: '#FF0000' }}>Logout</a>
        </div> */}

        <img
          src="https://img.freepik.com/premium-vector/people-profile-graphic_24911-21373.jpg"
          alt="Profile"
          width="50"
          height="50"
          className="profile-pic"
          onClick={toggleDropdown}
          style={{ cursor: 'pointer', borderRadius: '50%', marginRight: '10px' }}
        />
        {dropdownOpen && (
          <div className="dropdown-menu show">
            <a className="dropdown-item" href="#">Welcome, {user.name}</a>
            <a className="dropdown-item" href="/getorders">Orders</a>
            <a className="dropdown-item" onClick={logoutUser} style={{ cursor: 'pointer' }}>Logout</a>
          </div>
        )}


      </>
    )
  }

  const loggedOutRouter = () => {
    return (
      <>
        <a className="btnLogin btn-outline-success" href="/login" style={{ textDecoration: 'none' }}>Login</a>
      </>
    )
  }




  useEffect(() => {
    setIsLogged(isLogged);
    // setTotalCartLength(totalCartLength);
    let token = localStorage.getItem('token')
    if (token) {
      const getUser = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST_URI}/user/info`, {

            method: "GET",
            headers: {
              Authorization: token
            }
          });

          const json = await response.json();
          //console.log(json);

          if (json.success) {
            setIsLogged(true);
            setUser(json.user);
            setCartLength(json.user.cart.length);
            json.user.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
            //console.log(json.user);
          } else {
            props.showAlert("Invalid credentials", "danger");
            //alert("Invalid credentials")
          }




        } catch (err) {
          props.showAlert(err.response.data.msg, "danger");
          //alert(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [localStorage.getItem('token')]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};

useEffect(() => {
  const navbarToggler = document.querySelector('.navbar-toggler');
  navbarToggler.addEventListener('click', toggleMenu);

  return () => {
    navbarToggler.removeEventListener('click', toggleMenu);
  };
}, []);


  return (
    <nav className="navbar fixed-top navbar-collapse navbar-expand-lg navbar-light bg-warning" style={{ height: "100px", fontSize: "22px", fontFamily: "inherit" }}>
      <div className="container-fluid  d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-header d-flex align-items-center">
          <img src={logo} alt="WingedUp" width="60" height="60" />
          <a className="navbar-brand" href="/" style={{ fontSize: "22px" }}>WingedUp</a>
        </div>
        </div>
        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
          <ul className="navbar-nav">
            {isAdmin ? adminRouter() : userRouter()}
          </ul>
          <div className="d-flex align-items-center">
            <a href="/cart" style={{ position: 'relative', marginRight: '10px' }}>
              <i className="fa-solid fa-cart-plus cart fa-xl" style={{ color: "#9bba0a" }}></i>
              <span className="badge badge-warning" id="lblCartCount" style={{ position: 'absolute', top: '-8px', right: '-8px' }}>{cartLength}</span>
            </a>
            {isLogged ? loggedInRouter() : loggedOutRouter()}
          </div>
        </div>
      </div>
    </nav>
  );




}

export default Navbar
