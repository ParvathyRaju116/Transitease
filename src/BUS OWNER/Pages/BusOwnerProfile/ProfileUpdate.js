import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getProfileApi } from '../../BUS_OWNER_SERVICES/busOwnerApis';

function ProfileUpdate() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true); getProfile }
    const [profile, setProfile] = useState({
        is_approved: "",
        phone: "",
        address: "",
        username: "",
        password: "",
        proof: ""
    })
    const getProfile = async () => {
        let token = localStorage.getItem('token')
        if (token) {
            let headers = {
                "Authorization": `Token ${token}`
            }
            let result = await getProfileApi(headers)
            if (result.status >= 200 && result.status < 300) {
                setProfile(result.data)
            }
        }
        else {
            navigate('/bus-owner-auth')
            Swal.fire({
                icon: "warning",
                title: 'Please login',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <>
            <Button variant="primary btn-red" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update profile details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <FloatingLabel controlId="floatingInput" label="Phone" className="mb-3">
                            <Form.Control type="tel" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Address">
                            <Form.Control as="textarea" placeholder="Address" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" placeholder="Password" />
                        </FloatingLabel>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProfileUpdate