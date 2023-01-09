import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getImagePath } from '../../shared/helper/genHelper';
import _ from 'lodash';
import { Modal, DatePicker } from "antd";
import dayjs from 'dayjs';

export default function ServiceDetails() {

    const { id } = useParams();
    const [serviceDetails, setServiceDetails] = useState({});
    const [bookNowModalOpen, setBookNowModalOpen] = useState(false);
    const [selectedObj, setSelectedObj] = useState({});
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        console.log("I am the ID:::", id);
        getServiceDetail(id);
    }, [id]);

    const getServiceDetail = (serviceId) => {
        axios
            .get(`/getServicePrice?i=${serviceId}`)
            .then(op => {
                if (op && op.data && op.data.result) {
                    setServiceDetails(op.data.result);
                }
            })
            .catch(e => console.log("Exception:", e))
    }

    const handleBookNowModalClose = () => {
        setBookNowModalOpen(false);
        setFromDate('');
        setToDate('');
        selectedObj({})
    }

    const handleBookClick = (contractorId, servicePriceId) => {
        setBookNowModalOpen(true);
        setSelectedObj({ contractorId: contractorId, servicePriceId: servicePriceId });
    }

    const handleFromChange = (e) => {
        console.log("I am the e here::", dayjs(e).format('DD/MM/YYYY HH:mm'));
        setFromDate(e);
    }

    const handleToChange = (e) => {
        setToDate(e);
    }

    const handleOkClick = () => {
// console.log("I am the ok click")
        // if (toDate && fromDate) {

            let bookingData = {
                "contractorId": selectedObj.contractorId,
                "serviceId": parseInt(id),
                "bookingDateTimeFrom":  dayjs(fromDate).format('YYYY-MM-DD HH:mm:ss'),
                "bookingDateTimeTo": dayjs(toDate).format('YYYY-MM-DD HH:mm:ss'),
                "servicePriceId": parseInt(selectedObj.servicePriceId)
            }
            axios
                .post('/createNewBooking', bookingData, { headers: { 'Authorization': `Bearer ${localStorage.getItem("__t")}` } })
                .then(op => {
                    console.log("I am the op:", op)
                    if(op){
                        handleBookNowModalClose();
                    }
                })
                .catch(e => console.log("Exception: ", e))

        // }
        // else {
            // show an error message
        // }
    }

    return (

        <main id="main">

            <section id="breadcrumbs" className="breadcrumbs">
                <div className="container">

                    <div className="d-flex justify-content-between align-items-center">
                        <h2>{serviceDetails.serviceTitle}</h2>
                        <ol>
                            <li><a href="index.html">Home</a></li>
                            <li>{serviceDetails.serviceTitle}</li>
                        </ol>
                    </div>

                </div>
            </section>

            <section id="portfolio-details" className="portfolio-details">
                <div className="container">

                    <div className="row gy-4">

                        <div className="col-lg-8">
                            <div className="portfolio-details-slider swiper">
                                <div className="swiper-wrapper align-items-center">

                                    <div className="swiper-slide">
                                        <img src={getImagePath(serviceDetails.serviceImage)} alt="" />
                                    </div>

                                </div>
                                <div className="swiper-pagination"></div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="portfolio-info">
                                <h3>Service Details</h3>
                                <ul>
                                    <li><strong>Service Type</strong>: {serviceDetails.serviceType}</li>
                                </ul>
                                <div className="card">
                                    <div className="card-header text-center bg-white">
                                        Prices for service
                                    </div>
                                    {
                                        !_.isEmpty(serviceDetails.prices) && serviceDetails.prices.map((el) =>
                                            <div className="card-body mb-0 prices-container">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div>
                                                        <div className="card-title mb-0 text-decoration-line-through text-muted" style={{ fontSize: 12 }}><i class="fas fa-rupee-sign"></i> {el.unitPrice} </div>
                                                        <div className="card-title mb-0" style={{ color: '#B12704', fontSize: 18 }}><i class="fas fa-rupee-sign"></i> {el.discountPrice} <span className="fw-lighter" style={{ fontSize: 12 }}>(<i class="fas fa-rupee-sign"></i> {el.discountPrice} / {el.unit})</span></div>
                                                        <p className="card-text fw-lighter text-muted mb-0" style={{ fontSize: 12 }}>By : <span className="text-uppercase text-secondary fw-normal">{el.contractorName}</span></p>
                                                    </div>
                                                    <div>
                                                        <a onClick={() => handleBookClick(el.contractorId, el.servicePriceId)} className="btn btn-buy" style={{ "--bs-btn-padding-y": ".25rem", "--bs-btn-padding-x": ".5rem", "--bs-btn-font-size": ".75rem" }}>Book</a>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    }


                                </div>
                            </div>
                            <div className="portfolio-description">
                                <h2>Service Description</h2>
                                <p>{serviceDetails.serviceDescription}</p>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
            <Modal
                className="profile-settings"
                title={'Book Service'}
                open={bookNowModalOpen}
                onOk={handleOkClick}
                onCancel={handleBookNowModalClose}
                okText={'Book'}
            >
                <div className="my-4">
                    <div class="mb-3">
                        <label for="name" class="form-label">Booking From Date</label>
                        <DatePicker
                            className="form-control"
                            format="YYYY-MM-DD HH:mm"
                            showTime={{
                                defaultValue: dayjs('00:00:00', 'HH:mm'),
                            }}
                            placeholder={'Select booking from date'}
                            onChange={handleFromChange}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="address" class="form-label">Booking To Date</label>
                        <DatePicker
                            className="form-control"
                            format="YYYY-MM-DD HH:mm"
                            showTime={{
                                defaultValue: dayjs('00:00:00', 'HH:mm'),
                            }}
                            placeholder={'Select booking to date'}
                            onChange={handleToChange}
                        />
                        {/* <textarea onChange={(e) => setAddress(e.target.value)} value={address} class="form-control" id="address" placeholder="Enter Address" /> */}
                    </div>

                </div>
            </Modal>
        </main>

    );
}