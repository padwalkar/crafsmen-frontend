import React, { useEffect, useState } from "react";
import crafsmenLogo from '../../../assets/img/crafsmen-logo.png';
import { NavLink } from "react-router-dom";
import _ from 'lodash';
import LoginModal from "../../sharedComponents/loginModal";
import ProfileSettings from "../../sharedComponents/profileSettings";
import { isUserLogin, getImagePath } from '../../helper/genHelper';
import axios from "axios";

export default function Header() {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);
    const [customerDetails, setCustomerDetails] = useState('');

    useEffect(() => {
        getCustomer();
    }, []);

    const getCustomer = async () => {
        if (isUserLogin()) {
            axios
                .get('/getCustomerDetails', { headers: { 'Authorization': `Bearer ${localStorage.getItem("__t")}` } })
                .then(op => {
                    console.log("i am the customer", op)
                    if (op && op.data && op.data.result) {
                        setCustomerDetails(op.data.result);
                    }
                })
                .catch(e => console.log("Exception:", e))
        }
    }

    const openLoginModal = (e) => {
        e.preventDefault();
        setIsLoginOpen(true);
    }

    const handleProfileSettingsClick = (e) => {
        e.preventDefault();
        setIsProfileSettingsOpen(true);
    }

    const handleLogoutClick = (e) => {
        console.log("I am clicked logged out")
        e.preventDefault();
        localStorage.clear();
        window.location.reload();
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
                        {!isUserLogin() && <li><a className="getstarted scrollto" href="#" onClick={openLoginModal}>Login</a></li>}
                        {isUserLogin() && <li class="dropdown">
                            <a href="#">
                                <span>
                                    {customerDetails && customerDetails.userImage ? <img style={{width: 30, height: 30, borderRadius: '50%'}} src={getImagePath(customerDetails.userImage)} /> : 
                                    <i style={{ fontSize: 22 }} class="fas fa-user-circle text-secondary"></i>
                                    }
                                    </span>
                            </a>
                            <ul>
                                <li><a onClick={handleProfileSettingsClick} href="#">Profile Settings</a></li>
                                <li><a href="/my-bookings">My Bookings</a></li>
                                <li><a onClick={handleLogoutClick} href="#">Logout</a></li>
                            </ul>
                        </li>}
                    </ul>
                    <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>

            </div>
            {isLoginOpen &&
                <LoginModal
                    setIsLoginOpen={setIsLoginOpen}
                    isLoginOpen={isLoginOpen}
                />
            }
            {isProfileSettingsOpen &&
                <ProfileSettings
                    setIsProfileSettingsOpen={setIsProfileSettingsOpen}
                    isProfileSettingsOpen={isProfileSettingsOpen}
                    customerDetails={customerDetails}
                    getCustomer={getCustomer}
                />
            }
        </header>

    );
}