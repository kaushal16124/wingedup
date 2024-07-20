import React from 'react';
import './PrivacyPolicy.css';
import Footer from './Footer'
import pin from '../assets/pin.jpeg'

const PrivacyPolicy = () => {
  return (
    <>
      <div className="containerpolicy my-3">
        <header className="header">
        <h1 className="heading-with-pins">
            <img src={pin} alt="Left Pin" className="pin-image" />
            Privacy Policies
            <img src={pin} alt="Right Pin" className="pin-image" />
          </h1>
        </header>

        <section className="policy-section">
          
          <h2>
          <img src={pin} alt="Left Pin" className="pin-image" />
            Terms and Conditions</h2>
          <p>
            Welcome to WingedUp!! These Terms and Conditions govern your use of our website and services.
          </p>
          <div className="accordion" id="termsAccordion">
            <div className="accordion-item">
              <h3 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  1. Introduction
                </button>
              </h3>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#termsAccordion">
                <div className="accordion-body">
                  By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  2. Intellectual Property
                </button>
              </h3>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#termsAccordion">
                <div className="accordion-body">
                  All content on our website is owned by or licensed to WingedUp. You may not reproduce or distribute any content without our permission.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="policy-section">
          <h2>
          <img src={pin} alt="Left Pin" className="pin-image" />Data Privacy Policy</h2>
          <p>
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>
          <div className="accordion" id="privacyAccordion">
            <div className="accordion-item">
              <h3 className="accordion-header" id="headingOnePrivacy">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOnePrivacy" aria-expanded="true" aria-controls="collapseOnePrivacy">
                  1. Information Collection
                </button>
              </h3>
              <div id="collapseOnePrivacy" className="accordion-collapse collapse show" aria-labelledby="headingOnePrivacy" data-bs-parent="#privacyAccordion">
                <div className="accordion-body">
                  We collect information from you when you visit our website, register for an account, or make a purchase.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header" id="headingTwoPrivacy">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwoPrivacy" aria-expanded="false" aria-controls="collapseTwoPrivacy">
                  2. Information Use
                </button>
              </h3>
              <div id="collapseTwoPrivacy" className="accordion-collapse collapse" aria-labelledby="headingTwoPrivacy" data-bs-parent="#privacyAccordion">
                <div className="accordion-body">
                  We use your information to provide and improve our services, process transactions, and communicate with you.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header" id="headingThreePrivacy">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThreePrivacy" aria-expanded="false" aria-controls="collapseThreePrivacy">
                  3. Data Protection
                </button>
              </h3>
              <div id="collapseThreePrivacy" className="accordion-collapse collapse" aria-labelledby="headingThreePrivacy" data-bs-parent="#privacyAccordion">
                <div className="accordion-body">
                  We implement various security measures to protect your personal information from unauthorized access and use.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="policy-section">
          <h2>
          <img src={pin} alt="Left Pin" className="pin-image" />Refunds and Cancellations</h2>
          <p>
            We strive to ensure that you are satisfied with your purchase. If you are not satisfied, please follow our refund and cancellation policies.
          </p>
          <div className="accordion" id="refundsAccordion">
            <div className="accordion-item">
              <h3 className="accordion-header" id="headingOneRefunds">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOneRefunds" aria-expanded="true" aria-controls="collapseOneRefunds">
                  1. Refund Policy
                </button>
              </h3>
              <div id="collapseOneRefunds" className="accordion-collapse collapse show" aria-labelledby="headingOneRefunds" data-bs-parent="#refundsAccordion">
                <div className="accordion-body">
                  Refunds will be processed within 5-7 working days and credited to your bank account. Please contact us if you have any questions about our refund policy.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header" id="headingTwoRefunds">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwoRefunds" aria-expanded="false" aria-controls="collapseTwoRefunds">
                  2. Cancellation Policy
                </button>
              </h3>
              <div id="collapseTwoRefunds" className="accordion-collapse collapse" aria-labelledby="headingTwoRefunds" data-bs-parent="#refundsAccordion">
                <div className="accordion-body">
                  You may cancel your order within 24 hours of placing it. After this period, cancellations may not be accepted.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
};

export default PrivacyPolicy;
