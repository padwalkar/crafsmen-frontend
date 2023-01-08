import React from "react";
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from "./commonAssets/header";
import Home from "../../pages/Home";
import Footer from "./commonAssets/footer";
import AboutUs from "../../pages/About";
import ContactUs from "../../pages/ContactUs";
import ServiceDetails from "../../pages/serviceDetails";


export default function MainLayout() {
    return (
        <>
            <Header />
            <Routes>
                <Route>
                    <Route index element={<Home />} />
                    <Route path="about-us" element={<AboutUs />} />
                    <Route path="contact-us" element={<ContactUs />} />
                    <Route path="service-details/:id" element={<ServiceDetails />} />
                    {/* <Route path="dashboard" element={<Dashboard />} /> */}
                    {/* <Route path="service-list" element={<ServicesList />} /> */}
                    {/* <Route path="service-type" element={<ServicesType />} /> */}
                    {/* <Route path="contractor-list" element={<Contractor />} /> */}
                </Route>


            </Routes>
            <Footer />
        </>
    );
}