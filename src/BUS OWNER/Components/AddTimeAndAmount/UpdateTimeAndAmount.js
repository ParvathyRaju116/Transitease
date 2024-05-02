import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { addTimeAndAmountApi, updateTimeAndAmountApi } from '../../BUS_OWNER_SERVICES/busOwnerApis';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import './AddTimeAndAmount.css'
import Swal from 'sweetalert2';
import { FloatingLabel, Form } from 'react-bootstrap';

function UpdateTimeAndAmount({ id, oTime, oAmount, setStopUpdate }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [inputData, setInputData] = useState({ time: oTime, amount: oAmount })

    const handleSubmit = async () => {
        const { time, amount } = inputData
        if (!time || !amount) {
            Swal.fire({
                icon: "warning",
                title: 'Please fill the form completely',
                showConfirmButton: false,
                timer: 1500
            });
        }
        else {
            let token = localStorage.getItem('token')
            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Token ${token}`
            }
            try {
                let result = await updateTimeAndAmountApi(id, inputData, reqHeader)
                if (result.status >= 200 && result.status < 300) {
                    Swal.fire({
                        icon: "success",
                        title: "Time and amount updated successfully.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setStopUpdate(result.data)
                    console.log(result);

                    handleClose()
                }
                else {
                    console.log(result);
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
    }
    return (
        <>
            <Button variant="primary btn-red p-1 ms-1" onClick={handleShow}>
                <i className='fa-solid fa-pen' />
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update time and amount</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Stop time:
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <MobileTimePicker
                            label="Starting time:"
                            sx={{ width: '100%', paddingBottom: '10px' }}
                            value={inputData.time !== "" ? dayjs(inputData.time,"HH:mm:ss") : null}
                            onChange={(newValue) => {console.log("New Value:", newValue);setInputData({ ...inputData, time: newValue ? newValue.format("HH:mm:ss") : "" })}}
                        />
                    </LocalizationProvider>
                    Stop amount:
                    <FloatingLabel controlId="amountFloating" label="Amount in ₹">
                        <Form.Control value={inputData.amount} onChange={e => setInputData({ ...inputData, amount: e.target.value })} type="number" placeholder="" />
                    </FloatingLabel>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary btn-red" onClick={handleSubmit}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default UpdateTimeAndAmount
