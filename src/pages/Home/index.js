import React, { useEffect, useState } from "react";
import heroImg from '../../assets/img/hero-img.png';
import axios from "axios";
import _ from 'lodash';

import {getImagePath} from '../../shared/helper/genHelper';

export default function Home() {

    const [servicesList, setServicesList] = useState([]);

    useEffect(() => {
        axios
            .get('/getServicesList')
            .then(op => {
                console.log("I am the op", op)
                if (op && op.data && op.data.result) {
                    setServicesList(op.data.result);
                }
            })
            .catch(e => {
                console.log("Exception: ", e);
            })
    }, []);


    return (
        <>
            <section id="hero" className="d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h1 data-aos="fade-up">Grow your work done with Crafsmen</h1>
                            <h2 data-aos="fade-up" data-aos-delay="400">We are team of talented crafsmen making homes, places to amaze</h2>
                            {/* <div data-aos="fade-up" data-aos-delay="800">
                                <a href="#about" className="btn-get-started scrollto">Get Started</a>
                            </div> */}
                        </div>
                        <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="fade-left" data-aos-delay="200">
                            <img src={heroImg} className="img-fluid animated" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <main id="main">
                <section id="services" className="services">
                    <div className="container">

                        <div className="section-title" data-aos="fade-up">
                            <h2>Services</h2>
                            <p>Magnam dolores commodi suscipit eius consequatur ex aliquid fug</p>
                        </div>

                    </div>
                </section>


                <section id="more-services" className="more-services">
                    <div className="container">

                        <div className="row">
                            {
                                !_.isEmpty(servicesList) && servicesList.map((el) =>
                                    <div key={`service-${el.serviceId}`} className="col-md-6 d-flex align-items-stretch  mb-4">
                                        <div className="card" style={{ backgroundImage: `url(${getImagePath(el.serviceImage)})` }} data-aos="fade-up" data-aos-delay="100">
                                            <div className="card-body">
                                                <h5 className="card-title"><a href={`service-details/${el.serviceId}`}>{el.serviceTitle}</a></h5>
                                                <p className="card-text">{el.serviceExcept}</p>
                                                <div className="read-more"><a href={`service-details/${el.serviceId}`}><i className="bi bi-arrow-right"></i> Know More</a></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                    </div>
                </section>


            </main>

        </>
    );
}