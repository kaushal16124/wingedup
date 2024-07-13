import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import AboutUs from './components/AboutUs'
import BookRide from './components/BookRide'
import Courses from './components/Courses'
import Blogs from './components/Blogs';
import RideState from './context/rides/RideState';
import RideItemDetail from './components/RideItemDetail';
import PaymentSuccess from './components/PaymentSuccess';
import MemberState from './context/members/memberState';

import Login from './components/Login';
import SignUp from './components/SignUp';
import Cart from './components/Cart';
import ManageBlogs from './components/ManageBlogs'
import ManageMembers from './components/ManageMembers'
import ManageProducts from './components/ManageProducts'
import ProductState from './context/products/ProductState';
import CartState from './context/cart/cartState';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';
import BlogState from './context/blogs/blogState';
import OrderState from './context/orders/orderState';
import Orders from './components/Orders';
import ManageOrders from './components/ManageOrders';



function App() {
  const [progress,setProgress] = useState(0);

  return (
    <>
    <BrowserRouter>
    <RideState>
      <ProductState>
        <CartState>
          <BlogState>
            <OrderState>
    <MemberState>
    <LoadingBar
        color='#66ff33'
        progress={progress}
        height={4}
        
      />
    <Navbar/>
      <Routes>
        
          <Route exact path="/"  element={<Home setProgress={setProgress}/>}/>
          <Route exact path="/aboutus" element={<AboutUs setProgress={setProgress}/>}/>
          <Route exact path="/bookaride" element={<BookRide setProgress={setProgress}/>}/>
          <Route exact path="/courses" element={<Courses setProgress={setProgress}/>}/>
          <Route exact path="/blogs" element={<Blogs setProgress={setProgress}/>}/>
          <Route exact path="/rideitemdetail" element={<RideItemDetail setProgress={setProgress}/>}/>
          <Route exact path="/paymentsuccess" element={<PaymentSuccess setProgress={setProgress}/>} />
          <Route exact path="/login" element={<Login setProgress={setProgress}/>} />
          <Route exact path="/signup" element={<SignUp setProgress={setProgress}/>} />
          <Route exact path="/cart" element={<Cart setProgress={setProgress}/>} />
          <Route exact path="/manageproducts" element={<ManageProducts setProgress={setProgress}/>} />
          <Route exact path="/managemembers" element={<ManageMembers setProgress={setProgress}/>} />
          <Route exact path="/manageblogs" element={<ManageBlogs setProgress={setProgress}/>} />
          <Route exact path="/getorders" element={<Orders setProgress={setProgress}/>} />
          <Route exact path="/manageorders" element={<ManageOrders setProgress={setProgress}/>} />


      </Routes>
      </MemberState>
      </OrderState>
      </BlogState>
      </CartState>
      </ProductState>
      </RideState>
    </BrowserRouter>
    </>
  );
}

export default App;
