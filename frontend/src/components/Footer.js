import React from 'react';
import './Footer.css'; // Create a CSS file to style the footer
import logo from '../assets/logoWingedUp.png'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 my-2">
                        <img src={logo} alt="WingedUp Logo" className="footer-logo" />
                        <p>
                            Wanna get winged up? Got you!
                        </p>
                        <p>Come fly with us and have a priceless experience</p>

                    </div>
                    <div className="col-md-3 my-2">
                        <h5><strong>REACH US</strong></h5>
                        <p>
                        <a href="tel:+919459944140"><i className="fas fa-phone-alt"></i> +91-9459944140</a>
                        </p>
                        <p>
                            <a href="https://maps.app.goo.gl/pgo6KECazPUqp2sV6" target="_blank"><i className="fas fa-map-marker-alt"></i> WingedUp Paragliding, Bir-Billing </a>
                            </p>
                    </div>
                    <div className="col-md-3 my-2">
                        <h5><strong>LINKS</strong></h5>
                        <ul>
                            {/* <li><a href="#">Menu</a></li> */}
                            <li><a href="/bookaride">Book a Ride</a></li>
                            <li><a href="/courses">Solo Paragliding</a></li>
                            <li><a href="/aboutus">About us</a></li>
                            {/* <li><a href="#">FAQs</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Contact</a></li> */}
                        </ul>
                    </div>
                    <div className="col-md-3 my-2">
                        <h5><strong>OUR SOCIALS</strong></h5>
                        <p>Follow for updates</p>
                        <div className="social-icons">
                            <a href="https://www.instagram.com/wingedup/" target="_blank"><i className="fab fa-instagram"></i></a>
                            <a href="https://youtube.com/@wingedup?si=hh3YOLSrZJdDd0bm" target="_blank"><i className="fab fa-youtube"></i></a>
                           
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
