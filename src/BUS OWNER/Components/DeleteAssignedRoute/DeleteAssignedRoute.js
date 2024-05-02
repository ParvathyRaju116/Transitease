import React from 'react'
import { deleteSingleAssignedRouteApi } from '../../BUS_OWNER_SERVICES/busOwnerApis'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

function DeleteAssignedRoute({ id, setUpdate }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = async () => {
        let token = localStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Token ${token}`
        }
        try {
            let result = await deleteSingleAssignedRouteApi(id, reqHeader)
            if (result.status >= 200 && result.status < 300) {
                Swal.fire({
                    icon: "success",
                    title: "Route deleted successfully.",
                    showConfirmButton: false,
                    timer: 1500
                });
                setUpdate(result.data.id)
                handleClose()
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: result?.response?.data?.error,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (

        <>
            <Button variant="primary btn-red" onClick={handleShow}>
            <i className="fa-solid fa-trash"></i>
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure that you want to delete this assigned route? </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary btn-red" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteAssignedRoute