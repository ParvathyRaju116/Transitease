import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BusOwnerAside from '../../Components/BusOwnerAside/BusOwnerAside';
import { getAssignedRoutesApi, getOwnerBusesApi, getRoutesApi } from '../../BUS_OWNER_SERVICES/busOwnerApis';
import Stops from '../../Components/Stops/Stops';
import AssignBus from '../../Components/AssignBus/AssignBus';
import './BusOwnerRoutes.css'
import ManageStops from '../../Components/ManageStops/ManageStops';
import DeleteAssignedRoute from '../../Components/DeleteAssignedRoute/DeleteAssignedRoute';
import dayjs from 'dayjs';

function BusOwnerRoutes() {
    const [routeList, setRoutList] = useState([])
    const [assignedRoutes, setAssignedRoutes] = useState([])
    const [allBuses, setAllBuses] = useState([])
    // const [allDrivers, setAllDrivers] = useState([])
    const [isAproved, setIsAproved] = useState(false)
    const [update,setUpdate]=useState("")
    useEffect(() => {
        if (localStorage.getItem('is_approved')) {
            let Aproval = JSON.parse(localStorage.getItem('is_approved'))
            Aproval == 'True' ? setIsAproved(true) : setIsAproved(false)
        }
        else {
            setIsAproved(false)
        }
    }, [])
    const getData = async () => {
        const token = localStorage.getItem('token')
        const headers = {
            "Authorization": `Token ${token}`
        }
        const result1 = await getOwnerBusesApi(headers)
        if (result1.status >= 200 && result1.status < 300) {
            setAllBuses(result1.data)
        }
    }
    const getRoutes = async () => {
        const token = localStorage.getItem('token')
        const headers = {
            "Authorization": `Token ${token}`
        }

        const result = await getRoutesApi(headers)
        if (result.status >= 200 && result.status < 300) {
            setRoutList(result.data)
        }

    }
    const getAssignedRoutes = async () => {
        const token = localStorage.getItem('token')
        const headers = {
            "Authorization": `Token ${token}`
        }
        const result = await getAssignedRoutesApi(headers)
        if (result.status >= 200 && result.status < 300) {
            setAssignedRoutes(result.data)
        }
    }
    useEffect(() => {
        getRoutes(); getAssignedRoutes(); getData()
    }, [update])


    return (
        <div className='dashboardBody'>
            <div className='main-grid'>
                <div className='p-0'>
                    <BusOwnerAside></BusOwnerAside>
                </div>
                {isAproved ? <div className='px-lg-5 px-3 pt-2' style={{ overflow: 'auto' }}>
                    <h1 className='pb-3'>All routes</h1>
                    <Row>
                        {routeList ? routeList.map((i, index) => (
                            <>
                                <Col md={10}>
                                    <Accordion className='p-1' key={i?.id}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}>
                                            <Row style={{ display: 'flex', width: '100%' }}>
                                                <Col md={8}>
                                                    <h2 style={{ textTransform: 'capitalize' }}>{i?.name}</h2>
                                                </Col>
                                                <Col md={4}>
                                                    <div className='mx-auto'>
                                                        <b> Starts From : </b> {i?.starts_from} <br />
                                                        <b> Ends At : </b> {i?.ends_at}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div>
                                            </div>
                                            <Stops id={i.id} ></Stops>
                                        </AccordionDetails>
                                    </Accordion>
                                </Col>
                                <Col md={2} className='text-center'>
                                    <div className='py-2'><AssignBus id={i?.id} setUpdate={setUpdate}/></div>

                                </Col>
                            </>

                        )) : <></>}
                    </Row>
                    <div className='me-lg-5 mt-3 route-list-table p-4 shadow'>
                        <h2 className='text-start'>Assigned routes</h2>
                        <Table className='table-transparent striped mt-3'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Route</th>
                                    <th>Bus</th>
                                    <th>Category</th>
                                    <th>Route time</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignedRoutes?.map((i, index) =>
                                    <tr key={i.id}>
                                        <td>{index + 1}</td>
                                        <td>{i.route?.name}</td>
                                        <td>{i.bus?.name}</td>
                                        <td>{i.buscategory.category}</td>
                                        <td>{i?.routetime&&dayjs(i?.routetime, 'HH:mm:ss').format('h:mm A')}</td>
                                        <td>₹ {i?.amount}</td>
                                        <td><ManageStops id={i?.id}/> </td>
                                        <td><DeleteAssignedRoute id={i?.id} setUpdate={setUpdate}/></td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
                    : <div className='p-5 d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                        <div className='not-aproved text-center p-5'>
                            <h1>
                                You account is not aproved by admin yet!<br /> Please come back later.
                            </h1>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default BusOwnerRoutes