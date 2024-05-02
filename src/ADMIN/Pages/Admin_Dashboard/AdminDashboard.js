import React, { useEffect, useState } from 'react'
import './AdminDashboard.css'
import { Col, Row } from 'react-bootstrap'
import Aside from '../../Components/Aside/Aside'
import ListOfBus from '../../Components/List of bus/ListOfBus'
import Verification from '../../Components/Verification List on dashboard/Verification'
import {  busOwnerViewApi, passengerviewApi } from '../../../SERVICES/AllAPI'
import { Link } from 'react-router-dom'
import AddCategory from '../../Components/Add Category/AddCategory'

function AdminDashboard() {

  const token = localStorage.getItem("token")
  const[totalBusOwners,setTotalbusOwners]=useState([])
  const [totalPassenger,setTotalPassenger]=useState([])

  // bus ownerview
  const ownerview = async () => {
    const header = {
      Authorization: `Token ${token}`
    };
    const response = await busOwnerViewApi(header)
    setTotalbusOwners(response.data)
  }

  // users view
  const passengerview = async () => {
    const header = {
      Authorization: `Token ${token}`
    };
    const response = await passengerviewApi(header)
    setTotalPassenger(response.data)
    // console.log(response);
  }



  useEffect(() => {
    ownerview()
    passengerview()
  }, [])


  return (
    <div className='dashboardBody'>
      <Row>
        <Col lg={2} >
          <Aside></Aside>
        </Col>
        <Col lg={10} >
          <div className=' ms-5 pe-5 me-5 mt-5  w-100'>
            <Row className='mt-5 me-4'>
              <Col lg={4}>

            
                  <div  className='number shadow pt-5 text-center  p-5'>
  
                    <h1> <i className="fa-solid fa-users"></i></h1>
  
                    <h5 className=''>No of users</h5>
                    <h1>{totalPassenger.length}</h1>
  
  
                  </div>
             
              </Col>
              <Col lg={4}>
              <Link to={'/owner-list'}>
                  <div className='number shadow text-center  pt-5  p-5'>
  
                    <h1> <i className="fa-solid fa-bus"></i></h1>
  
                    <h5>No of Bus Owners</h5>
                    <h1>{totalBusOwners.length}</h1>
  
  
                  </div>
              </Link>


              </Col>
              <Col lg={4}>
                <AddCategory></AddCategory>
              </Col>
            </Row>

          </div>

          <Row className='mt-3 pt-3'>
            <Col lg={7}>
              <ListOfBus owners ={totalBusOwners}></ListOfBus>
            </Col>

            <Col lg={5}>
              <Verification></Verification>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AdminDashboard