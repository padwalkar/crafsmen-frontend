import React from "react";

import logo from '../../assets/img/crafsmen-logo.png';

export default function ContactUs() {
    return (
        <main id="main">
            <section className="breadcrumbs">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>Conatct Us</h2>
                        <ol>
                            <li><a href="/">Home</a></li>
                            <li>Contact Us</li>
                        </ol>
                    </div>
                </div>
            </section>

            {/* <section className="inner-page"> */}
            <section id="contact" className="contact">
                <div className="container">

                    {/* <div className="section-title" data-aos="fade-up">
                            <h2>Contact Us</h2>
                        </div> */}

                    <div className="row">
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
                            <div className="contact-about">
                                {/* <h3><img src={logo} style={{ width: 140 }} /></h3>
                                    <p>Cras fermentum odio eu feugiat. Justo eget magna fermentum iaculis eu non diam phasellus. Scelerisque felis imperdiet proin fermentum leo. Amet volutpat consequat mauris nunc congue.</p> */}
                                <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d6732.029688490467!2d77.59943985312188!3d12.912007795779969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1scrafsmen!5e0!3m2!1sen!2sin!4v1673200557268!5m2!1sen!2sin" width="600" height="450" style={{ border: 0, width: '100%' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="200">
                            <div className="info mb-5">
                                <div>
                                    <i className="ri-map-pin-line"></i>
                                    <p>A108 Adam Street<br />New York, NY 535022</p>
                                </div>

                                <div>
                                    <i className="ri-mail-send-line"></i>
                                    <p>info@example.com</p>
                                </div>

                                <div>
                                    <i className="ri-phone-line"></i>
                                    <p>+1 5589 55488 55s</p>
                                </div>

                            </div>
                            <div className="social-links">
                                <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                                <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                                <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                                <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                            </div>
                        </div>

                        <div className="col-lg-5 col-md-12" data-aos="fade-up" data-aos-delay="300">
                            <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                                <div className="form-group">
                                    <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                                </div>
                                <div className="my-3">
                                    <div className="loading">Loading</div>
                                    <div className="error-message"></div>
                                    <div className="sent-message">Your message has been sent. Thank you!</div>
                                </div>
                                <div className="text-center"><button type="submit">Send Message</button></div>
                            </form>
                        </div>

                    </div>

                </div>
            </section>
            {/* </section> */}

        </main>

    );
}