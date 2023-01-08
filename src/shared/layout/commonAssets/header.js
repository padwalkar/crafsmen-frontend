import React, { useEffect, useState } from "react";
import crafsmenLogo from '../../../assets/img/crafsmen-logo.png';
import { NavLink } from "react-router-dom";
import { Modal } from 'antd';
import axios from "axios";
import _ from 'lodash';

export default function Header() {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isUserLogin, setIsUserLogin] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("__t");

        if (token) {
            setIsUserLogin(true);
        }
        else {
            setIsUserLogin(false);
        }
    }, [])

    const openLoginModal = (e) => {
        e.preventDefault();
        setIsOtpSent(false);
        setIsLoginOpen(true);
        setIsUserLogin(false);
        setOtp('');
        setEmail('');
    }

    const closeLoginModal = () => {
        setIsLoginOpen(false);
        setOtp('');
        setEmail('');
    }

    const handleLoginClick = () => {
        if (_.isEmpty(otp)) {
            console.log("OTP IS REQUIRED")
        }
        else {
            axios
                .post('/validateCustomerOtp', { "emailOrPhone": email, "otp": parseInt(otp) })
                .then(op => {
                    if (op && op.data && op.data.result && op.data.result.token) {
                        localStorage.setItem("__t", op.data.result.token);
                        setIsUserLogin(true);
                        closeLoginModal();
                    }
                })
                .catch(e => console.log("Exception:", e))
        }
    }

    const handleGetOTPClick = () => {
        if (_.isEmpty(email)) {
            console.log("Email is empty")
        }
        else {
            axios
                .post('/customerLogin', { "emailOrPhone": email })
                .then(op => {
                    if (op && op.data && op.data.message && op.data.message === 'OTP_SENT_SUCCESSFULLY') {
                        setIsOtpSent(true);
                    }
                })
                .catch(e => console.log("Exception: ", e))
        }
    }
    const handleLogoutClick = (e) => {
        e.preventDefault();
        localStorage.clear();
        setIsUserLogin(false);
        setEmail('');
        setOtp('');
    }

    return (

        <header id="header" className="fixed-top d-flex align-items-center">
            <div className="container d-flex align-items-center justify-content-between">
                <div className="logo">
                    <NavLink to="/"><img src={crafsmenLogo} alt="Crafsmen Logo" className="img-fluid" /></NavLink>
                </div>
                <nav id="navbar" className="navbar">
                    <ul>
                        <li><NavLink className={(navData) => { return (navData.isActive ? 'active nav-link' : 'nav-link ') }} to="/">Home</NavLink></li>
                        <li><NavLink className={(navData) => { return (navData.isActive ? 'active nav-link' : 'nav-link ') }} to="/about-us">About Us</NavLink></li>
                        {/* <li><NavLink className={(navData) => { return (navData.isActive ? 'active nav-link' : 'nav-link ') }} to="/services">Services</NavLink></li> */}
                        <li><NavLink className={(navData) => { return (navData.isActive ? 'active nav-link' : 'nav-link ') }} to="/contact-us">Contact Us</NavLink></li>
                        {!isUserLogin && <li><a className="getstarted scrollto" href="#" onClick={openLoginModal}>Login</a></li>}
                        {isUserLogin && <li class="dropdown"><a href="#"><span>Welcome Vinayak</span> <i class="bi bi-chevron-down"></i></a>
                            <ul>
                                <li><a href="#">Profile Settings</a></li>
                                <li><a href="#">My Bookings</a></li>
                                <li><a onClick={handleLogoutClick} href="#">Logout</a></li>
                                {/* <li><a href="#">Drop Down 3</a></li>
                                <li><a href="#">Drop Down 4</a></li> */}
                            </ul>
                        </li>}
                    </ul>
                    <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>

            </div>
            {isLoginOpen && <Modal title={isOtpSent ? 'Login' : 'Get OTP'} open={isLoginOpen} onOk={isOtpSent ? handleLoginClick : handleGetOTPClick} onCancel={closeLoginModal} okText={'Login'}>
                <div className="my-4">
                    {
                        isOtpSent ?
                            <>
                                <p className="mb-1">Enter the otp received on <span className="fw-bolder"><i>"{email}"</i></span></p>
                                <div className="form-group">
                                    <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" name="otp" className="form-control" id="otp" placeholder="OTP" required />
                                </div>
                            </>
                            :
                            <>
                                <p>Enter you email address to continue</p>
                                <div className="form-group">
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" className="form-control" id="email" placeholder="Email address" required />
                                </div>
                            </>

                    }
                </div>
            </Modal>}
        </header>

    );
}