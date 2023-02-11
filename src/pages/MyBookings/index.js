import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Spin } from 'antd';
import _ from 'lodash';
import NoData from "../../shared/sharedComponents/noData";

export default function MyBookings() {

    const [myBookings, setMyBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(false);

    useEffect(() => {
        setLoadingBookings(true);
        axios
            .get('/getCustomerBookings')
            .then(op => {
                setMyBookings(op.data.result);
                // setMyBookings([]);
                setLoadingBookings(false);
            })
            .catch(e => {
                console.log("Exception: ", e);
                setLoadingBookings(false);
            })
    }, [])

    return (
        <main id="main">
            <section className="breadcrumbs">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
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
                            <table className="table">
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
                                        loadingBookings ?
                                            <tr>
                                                <td className="text-center border-0" colSpan={7}>
                                                    <div className="py-5 bg-light">
                                                        <Spin />
                                                        <h5 className="mt-3 fw-normal text-black-50">Loading Data</h5>
                                                    </div>
                                                </td>
                                            </tr>
                                            :
                                            <>
                                                {
                                                    _.isEmpty(myBookings) ? 
                                                    <>
                                                    <tr><td className="text-center border-0" colSpan={7}><NoData noDataTitle={'No bookings made by you'}/></td></tr>
                                                    </> : <>{

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
                                                    }</>
                                                }
                                            </>
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