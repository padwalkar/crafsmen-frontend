import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function MyBookings() {

    const [myBookings, setMyBookings] = useState([]);

    useEffect(() => {

        axios
            .get('/getCustomerBookings', { headers: { 'Authorization': `Bearer ${localStorage.getItem("__t")}` } })
            .then(op => {
                setMyBookings(op.data.result);
            })
            .catch(e => console.log("Exception: ", e))
    }, [])

    return (
        <main id="main">
            <section class="breadcrumbs">
                <div class="container">
                    <div class="d-flex justify-content-between align-items-center">
                        <h2>My Bookings</h2>
                        <ol>
                            <li><a href="/">Home</a></li>
                            <li>My Bookings</li>
                        </ol>
                    </div>
                </div>
            </section>

            <section id="about" className="about">
                <div className="container">

                    <div className="section-title" data-aos="fade-up">
                        <h2>List of all bookings made by you</h2>
                    </div>

                    <div className="row content">
                        <div className="col-lg-12" data-aos="fade-up" data-aos-delay="150">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Booking Id</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Contractor</th>
                                        <th scope="col">Service</th>
                                        <th scope="col">From Date</th>
                                        <th scope="col">To Date</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (myBookings) && myBookings.map((el) =>
                                            <tr>
                                                <td>{el.bookingId}</td>
                                                <td>{el.userName}</td>
                                                <td>{el.contractorName}</td>
                                                <td>{el.serviceTitle}</td>
                                                <td>{dayjs(el.bookingDateTimeFrom).format('DD-MM-YYYY HH:MM')}</td>
                                                <td>{dayjs(el.bookingDateTimeTo).format('DD-MM-YYYY HH:MM')}</td>
                                                <td>{el.discountPrice}</td>
                                            </tr>
                                        )

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </section>


        </main>
    );
}