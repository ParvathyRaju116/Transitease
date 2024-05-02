import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ManageStops.css'
import { addStopsApi, deleteStopApi, getAvailableStopsApi, singleAssignedRouteApi } from '../../BUS_OWNER_SERVICES/busOwnerApis';
import { Form, ListGroup } from 'react-bootstrap';
import AddTimeAndAmount from '../AddTimeAndAmount/AddTimeAndAmount';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import UpdateTimeAndAmount from '../AddTimeAndAmount/UpdateTimeAndAmount';


function ManageStops({ id }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => { getAssignedRouteInfo(); setShow(true); }
    const [routeInfo, setRouteInfo] = useState({})
    const [availableStops, setAvailableStops] = useState([])
    const [stopsToAdd, setStopsToAdd] = useState([])
    const [stopUpdate, setStopUpdate] = useState("")
    const getAssignedRouteInfo = async () => {
        const token = localStorage.getItem('token')
        const headers = {
            "Authorization": `Token ${token}`
        }
        const result1 = await singleAssignedRouteApi(id, headers)
        if (result1.status >= 200 && result1.status < 300) {
            setRouteInfo(result1.data)
        }
        const result2 = await getAvailableStopsApi(id, headers)
        if (result2.status >= 200 && result2.status < 300) {
            setAvailableStops(result2.data)
        }
    }
    const handleDeleteStop = async (id) => {
        const token = localStorage.getItem('token')
        const headers = {
            "Authorization": `Token ${token}`
        }
        const result = await deleteStopApi(id, headers)
        if (result.status >= 200 && result.status < 300) {
            Swal.fire({
                icon: "success",
                title: "Stop deleted successfully",
                showConfirmButton: false,
                timer: 1500
            });
            getAssignedRouteInfo()
        }
        else{
            console.log(result);
            Swal.fire({
                icon: "error",
                title: "Something went wrong. Please try again later",
                showConfirmButton: false,
                timer: 1500
            }); 
        }
        
    }
    const handleSelect = (e) => {
        if (e.target.checked) {
            setStopsToAdd([...stopsToAdd, e.target.value])
        }
        else {
            setStopsToAdd(stopsToAdd.filter(i => i != e.target.value))
        }
    }
    const addStops = async () => {
        if (stopsToAdd.length == 0) {
            Swal.fire({
                icon: "warning",
                title: "Please select stops",
                showConfirmButton: false,
                timer: 1500
            });

        }
        else {

            const token = localStorage.getItem('token')
            const headers = {
                "Authorization": `Token ${token}`
            }
            const result = await addStopsApi(id, { stops: stopsToAdd }, headers)
            if (result.status >= 200 && result.status < 300) {

                Swal.fire({
                    icon: "success",
                    title: "Stops added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                getAssignedRouteInfo()
            }
        }
    }
    useEffect(() => { getAssignedRouteInfo() }, [stopUpdate])
    return (
        <>
            <Button variant="primary" className='btn-red' onClick={handleShow}>
                Manage stops
            </Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Stops of '{routeInfo?.bus_route?.bus?.name}' on the route '{routeInfo?.bus_route?.route?.name}' </Modal.Title>
                </Modal.Header>
                {routeInfo?.bus_route_stops?.length > 0 ?
                    <Modal.Body>
                        <ListGroup>
                            {routeInfo?.bus_route_stops?.map(i =>
                                <ListGroup.Item key={i.stopid}>
                                    <div className='d-flex justify-content-between align-items-center'>{i.stop}
                                        {i.bus_stop_detail ?
                                            <div><i className="fa-solid fa-clock"></i> {i.bus_stop_detail.time && dayjs(i.bus_stop_detail.time, 'HH:mm:ss').format('h:mm A')}&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa-solid fa-indian-rupee-sign"></i> {i.bus_stop_detail.amount} 
                                            <UpdateTimeAndAmount id={i.bus_stop_detail.id} oTime={i.bus_stop_detail.time} oAmount={i.bus_stop_detail.amount} setStopUpdate={setStopUpdate} />
                                            </div>
                                            :
                                            <AddTimeAndAmount id={i.stopid} setStopUpdate={setStopUpdate} />}
                                            
                                        <Button className='btn-red p-1' onClick={()=>handleDeleteStop(i.stopid)}><i className='fa-solid fa-trash' /> </Button>
                                    </div>
                                </ListGroup.Item>
                            )}
                        </ListGroup>

                    </Modal.Body>
                    : <Modal.Body>
                        <h3>Please select stops for this route</h3>
                        <ListGroup>
                            {availableStops?.map(i =>
                                <label>
                                    <ListGroup.Item key={i.id} className='d-flex p-1 hover'>
                                        <Form.Check type="checkbox" value={i.id} onChange={e => handleSelect(e)} className='form-check' />
                                        <span className='fs-5'>&nbsp;&nbsp;{i.place}</span>
                                    </ListGroup.Item>
                                </label>
                            )
                            }
                        </ListGroup>

                    </Modal.Body>}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {routeInfo?.bus_route_stops?.length == 0 && <Button variant="primary" className='btn-red' onClick={addStops}>
                        Add Stops
                    </Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ManageStops