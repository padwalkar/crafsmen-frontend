import React, { useState } from "react";
import { Modal } from 'antd';
import axios from "axios";
import _ from 'lodash';

export default function LoginModal({ setIsLoginOpen, isLoginOpen }) {

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    const closeLoginModal = () => {
        setIsLoginOpen(false);
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
                        closeLoginModal();
                        window.location.reload();
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

    return (
        <Modal
            className="login-modal"
            title={'Login'}
            open={isLoginOpen}
            onOk={isOtpSent ? handleLoginClick : handleGetOTPClick}
            onCancel={closeLoginModal}
            okText={isOtpSent ? 'Login' : 'Get OTP'}
        >
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
        </Modal>
    );
}