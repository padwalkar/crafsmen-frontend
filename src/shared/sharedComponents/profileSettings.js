import React, { useState } from "react";
import { Modal } from 'antd';
import axios from 'axios';

export default function ProfileSettings({ setIsProfileSettingsOpen, isProfileSettingsOpen, customerDetails, getCustomer }) {

    const [name, setName] = useState(customerDetails.userName);
    const [address, setAddress] = useState(customerDetails.userAddress);
    const [email, setEmail] = useState(customerDetails.userEmail);
    const [contact, setContact] = useState(customerDetails.userContactNumber);
    const [gender, setGender] = useState((customerDetails.userGender) ? 'male' : 'female');
    const [profilePict, setProfilePict] = useState(customerDetails.userImage);
    const [file, setFile] = useState('');

    const handleUpdateClick = async () => {

        if (file) {
            
            let fileUrl = await uploadFile();
            let updateData = {
                "userName": name,
                "userAddress": address,
                "userContactNumber": parseInt(contact),
                "userGender": (gender === 'male') ? true : false,
                "userImage": fileUrl
            }
            axios
                .post('/updateCustomer', updateData, { headers: { 'Authorization': `Bearer ${localStorage.getItem("__t")}` } })
                .then(op => {
                    if(op && op.data && op.data.message==="UPDATED"){
                        setIsProfileSettingsOpen(false);
                        getCustomer();
                    }
                })
                .catch(e => console.log("Exception: ", e))
        }
    }

    const handleCancelClick = () => {
        setIsProfileSettingsOpen(false);
    }

    const handleGenderClick = (val) => {
        setGender(val);
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const uploadFile = () => {
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem("__t")}`
                },
            };
            return axios
                .post('/uploadFile', formData, config)
                .then(op => {
                    if (op && op.data && op.data.message === "IMAGE_UPLOADED") {
                        setProfilePict(op.data.result);
                        return (op.data.result);
                    }
                })
                .catch(e => console.log("Exception: ", e))
        }
    }

    return (
        <Modal
            className="profile-settings"
            title={'Update Profile'}
            open={isProfileSettingsOpen}
            onOk={handleUpdateClick}
            onCancel={handleCancelClick}
            okText={'Update'}
        >
            <div className="my-4">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" class="form-control" id="name" placeholder="Enter Full Name" />
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Address</label>
                    <textarea onChange={(e) => setAddress(e.target.value)} value={address} class="form-control" id="address" placeholder="Enter Address" />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input disabled onChange={(e) => setEmail(e.target.value)} value={email} type="email" class="form-control" id="email" placeholder="Enter Email" />
                </div>
                <div class="mb-3">
                    <label for="contact" class="form-label">Contact</label>
                    <input onChange={(e) => setContact(e.target.value)} value={contact} type="contact" class="form-control" id="contact" placeholder="Enter Contact" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Gender</label>
                    <div class="form-check">
                        <input onClick={() => handleGenderClick('male')} checked={gender === 'male'} class="form-check-input" type="radio" name="gender" id="male" />
                        <label class="form-check-label" for="male">Male</label>
                    </div>
                    <div class="form-check">
                        <input onClick={() => handleGenderClick('female')} checked={gender === 'female'} class="form-check-input" type="radio" name="gender" id="female" />
                        <label class="form-check-label" for="female">Female</label>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="profilePicture" class="form-label">Profile Picture</label>
                    <input class="form-control" onChange={handleFileChange} type="file" id="profilePicture" accept="image/png, image/jpeg, image/jpg" />
                </div>
            </div>
        </Modal>
    );
}