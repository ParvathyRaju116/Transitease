import React, { useEffect, useState } from 'react'
import './ListOfBus.css'
import { Button, Col, Modal, Row, Table } from 'react-bootstrap'
import { busListApi, getOnebusApi } from '../../../SERVICES/AllAPI'

function ListOfBus({ owners }) {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [AllbusList, setAllBusList] = useState([]);
  const [oneBus, setOneBus] = useState(null);

  const token = localStorage.getItem("token");
  const header = {
    Authorization: `Token ${token}`
  };

  const busList = async () => {
    const response = await busListApi(header);
    setAllBusList(response.data);
  };

  const getOneBus = async (id) => {
    setFullscreen(true);
    setShow(true);
    const response = await getOnebusApi(id, header);
    setOneBus(response.data);
    // console.log(response.data);
  };

  useEffect(() => {
    busList();
  }, []);

  return (
    <div className='ms-5 list-table p-4 shadow'>
      <h1>List Of Bus</h1>

   { AllbusList && AllbusList.length>0?  <Table className='table-transparent table striped mt-3'>
        <thead>
          <tr>
            <th>#</th>
            <th>Bus Name</th>
            <th>Owner Name</th>
            <th>Number</th>
            <th>Action</th>
          </tr>
        </thead>
        {AllbusList.length>0 ? AllbusList.map((i, index) => (
          <tbody key={i.id}>
            <tr>
              <td>{index + 1}</td>
              <td>{i.name}</td>
              <td>{i.busowner.username}</td>
              <td>{i.Number_plate}</td>
              <td><Button className='text-black border-0' style={{ backgroundColor: 'transparent' }} onClick={() => getOneBus(i.id)}><i className="fa-solid fa-file-pen"></i></Button></td>
            </tr>
          </tbody>
        )) : <></>}
      </Table>:<div className='text-center text-danger mt-5'><><b>No Buses Added Yet!!</b></></div>}

      <>
     { oneBus &&  <Modal className='' show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
          <Modal.Header closeButton className='m-5'>
            <Modal.Title><h1 className='busHead'>{oneBus?oneBus.name:""}</h1></Modal.Title>
          </Modal.Header>
          <Modal.Body className='m-3 modalBody'>
            {oneBus ? (
            <>
                <Row className='d-flex justify-content-center align-item-center ms-5 me-5 ps-5 pe-5'>
                  <Col className=' ps-5  justify-content-center align-item-center' lg={6}>
                   
                    <img className='OnebusImg w-75 ps-5' src={oneBus.image ? `http://127.0.0.1:8000${oneBus.image}` : 'https://i.postimg.cc/VNPZgJJt/placeholder-image.jpg'} alt="" />
                    <br /> <br />
                    <img
                      className='OnebusImg w-75 ps-5'
                      src={oneBus.RC_book ? `http://127.0.0.1:8000${oneBus.RC_book}` : 'https://i.postimg.cc/VNPZgJJt/placeholder-image.jpg'}
                      alt=''
                    />
                  </Col>
                  <Col className=' pe-5 mt-5  justify-content-center align-item-center' lg={6}>
                  <div className='text-start' style={{textTransform:'capitalize'}}>
                    <h1>Bus Details</h1>
            
             
                  <p className='fs-5' style={{ lineHeight: '1.3' }}>
                      <b>Number Plate :</b> {oneBus.Number_plate}
                    </p>
                    <p className='fs-5' style={{ lineHeight: '1.3' }}>
                      <b>Engine Number :</b> {oneBus.Engine_no}
                    </p>
              </div>

              <br />

              <div className='text-start' style={{textTransform:'capitalize'}}>
                <h1>Bus Owner Details</h1>
                <p className='fs-5' style={{ lineHeight: '1.3' }}>
                      <b>Bus Owner :</b> {oneBus.busowner.username}
                    </p>

                    <p className='fs-5' style={{ lineHeight: '1.3' }}>
                      <b>Phone</b> : {oneBus.busowner.phone}
                    </p>

                    <p className='fs-5' style={{ lineHeight: '1.3', }}>
                      <b>Address</b> : {oneBus.busowner.address}
                    </p>
                </div>
                  </Col>
                </Row>

  
            </>

              
            ) : (
              <p>Loading...</p>
            )}
          </Modal.Body>
        </Modal>}
      </>
    </div>
  );
}

export default ListOfBus;
