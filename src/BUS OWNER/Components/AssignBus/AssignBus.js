import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { BASE_URL } from '../../../SERVICES/Base_Url';
import { getOwnerBusesApi, getCategoriesApi, assignBusApi } from '../../BUS_OWNER_SERVICES/busOwnerApis';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import './AssignBus.css'
import Swal from 'sweetalert2';
import { FloatingLabel, Form } from 'react-bootstrap';


function AssignBus({ id ,setUpdate}) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [allCategories, setAllCategories] = useState([])
    const [serviceData, setServiceData] = useState({ bus: "", buscategory: "", route: id, routetime: "", amount: "" })
    const handleClose = () => { setShow(false); setServiceData({ bus: "", buscategory: "", route: id, routetime: "", amount: "" }) }
    const [allBuses, setAllBuses] = useState([])
    const getData = async () => {
        const token = localStorage.getItem('token')
        const headers = {
            "Authorization": `Token ${token}`
        }
        const result1 = await getOwnerBusesApi(headers)
        if (result1.status >= 200 && result1.status < 300) {
            setAllBuses(result1.data)
        }
        let result2 = await getCategoriesApi(headers)
        if (result2.status >= 200 && result2.status < 300) {
            setAllCategories(result2.data)
        }

    }
    useEffect(() => { getData() }, [])
    const handleSubmit = async () => {
        const { bus, buscategory, route, routetime, amount} = serviceData
        if (!bus || !buscategory || !route || !routetime || !amount) {
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
        let result = await assignBusApi(serviceData, reqHeader)
        if (result.status >= 200 && result.status < 300) {
          Swal.fire({
            icon: "success",
            title: "Route assigned successfully.",
            showConfirmButton: false,
            timer: 1500
          });
          setUpdate(result.data.id)
          getData()
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
    }

    return (
        <>
            <Button className='btn-bg' variant="primary" onClick={handleShow}>
                Assign
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Assign a bus to this route</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Autocomplete
                        id="bus-select"
                        sx={{ width: '100%', paddingBottom: '10px' }}
                        options={allBuses}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <img
                                    loading="lazy"
                                    width="40"
                                    srcSet={`${BASE_URL}${option.image} 2x`}
                                    src={`${BASE_URL}${option.image}`}
                                    alt=""
                                />
                                {option.name} ({option.Number_plate})
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Choose a bus"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }} />
                        )}
                        onChange={(e, v) => { setServiceData({ ...serviceData, bus: v ? v.id : "" }) }}
                    // value={allBuses.find(i=>i.id==serviceData.bus)}
                    />
                    <FloatingLabel controlId="floatingSelect" label="Select categor">

                        <Form.Select aria-label="Floating label select " value={serviceData.buscategory} onChange={e => setServiceData({ ...serviceData, buscategory: e.target.value })} className='mb-3 lg'>
                            <option>Select category</option>
                            {allCategories?.map(i =>
                                <option value={i.id} key={i.id}>{i.category}</option>
                            )}
                        </Form.Select>
                    </FloatingLabel>

                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <MobileTimePicker
                            label="Starting time:"
                            sx={{ width: '100%', paddingBottom: '10px' }}
                            value={dayjs(serviceData.routetime)}
                            onChange={(newValue) => setServiceData({ ...serviceData, routetime: newValue.format("HH:mm:ss") })}
                        />
                    </LocalizationProvider>
                    <FloatingLabel controlId="amountFloating" label="Amount in ₹">
                        <Form.Control value={serviceData.amount} onChange={e=>setServiceData({...serviceData,amount:e.target.value})} type="number" placeholder="" />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className="btn-bg" onClick={handleSubmit} variant="primary">Assign</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AssignBus