import React, { useEffect, useState } from 'react'
import './BusOwnerHome.css'
import {  Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import BusOwnerAside from '../../Components/BusOwnerAside/BusOwnerAside'
import { getAssignedRoutesApi, getOwnerBusesApi } from '../../BUS_OWNER_SERVICES/busOwnerApis'
import BusOwnerBuses from '../../Components/BusOwnerBuses/BusOwnerBuses'

function BusOwnerHome() {
  const [allBuses, setAllBuses] = useState([])
  const [assignedRoutes, setAssignedRoutes] = useState([])
  const [isAproved, setIsAproved] = useState(false)
  const navigate = useNavigate()
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
  useEffect(() => { getData();getAssignedRoutes() }, [])

  return (
    <div div className='dashboardBody' >
      <div className='main-grid'>
        <div className='p-0'>
          <BusOwnerAside></BusOwnerAside>
        </div>

        <div>
          {isAproved ? <div className='m-2 w-100'>
            <div className='m-1'>
              <Row>
                <Col md={6}>
                  <div className='number-bus-owner shadow m-1 p-3 mt-3  text-center py-4'>
                    <h1> <i className="fa-solid fa-bus"></i></h1>
                    <h2 className=''>No of buses</h2>
                    <h1>{allBuses?.length}</h1>
                  </div>
                </Col>
                <Col md={6}>
                  <Link to={'/bus-owner-routes'}>
                    <div className='number-bus-owner shadow  p-3 mt-3 text-center py-4'>
                      <h1> <i className="fa-solid fa-bus"></i></h1>
                      <h2 className=''>No of assigned routes</h2>
                      <h1>{assignedRoutes?.length}</h1>
                    </div>
                  </Link>
                </Col>
              </Row>

              <BusOwnerBuses />
            </div>
          </div> :
            <div className='p-3 d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
              <div className='not-aproved text-center p-5'>
                <h1>
                  You account is not aproved by admin yet!<br /> Please come back later.
                </h1>              </div>
            </div>}
        </div>
      </div>
    </div >
  )
}

export default BusOwnerHome