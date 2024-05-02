import React, { useEffect, useState } from "react";
import "./RouteList.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StopList from "../StopList/StopList";
import axios from "axios";
import { Col, Modal, Row } from "react-bootstrap";

function RouteList() {
  const [showModal, setShowModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [allRoutes, setAllRoutes] = useState([]);
  const token = localStorage.getItem("token");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (route) => {
    setSelectedRoute(route);
    setShowModal(true);
  };

  const getAllRoutes = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/passengerapi/route/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      console.log(response.data);
      setAllRoutes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRoutes();
  }, []);

  return (
    <div>
      <div className="m-5">
        <div className="m-5 bustopBody shadow text-center">
          {allRoutes && allRoutes.length > 0 ? (
            allRoutes.map((route) => (
              <Accordion className='ps-5 w-100' key={route.busroute.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="panel1-header"
                  className='d-flex'
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <div className="log" style={{ display: 'flex', width: '100%' }}>
                    <img
                      onClick={() => handleShowModal(route)}
                      className="bustopLogo"
                      src="https://i.postimg.cc/DwB1WWDp/bus-station.png"
                      alt=""
                    />
                    <div className="ms-5 catDiv pt-2">{route.busroute.buscategory.category}</div>
                    <h3 style={{ textTransform: 'capitalize' }} className="ms-4">{route.busroute.route.name}</h3>
                    <div className='ms-auto text-end me-5 pe-5' style={{textTransform:'capitalize'}}>
                      <b>Starts From: </b> {route.busroute.route.starts_from} <br />
                      <b>Ends At: </b> {route.busroute.route.ends_at}
                    </div>
                    <p className="me-5"> <b>Time </b> {route.busroute.routetime} <br /></p>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    <StopList id={route?.busroute?.id}></StopList>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <p>No routes available.</p>
          )}
        </div>
      </div>
      {selectedRoute && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Bus Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className="BoDy">
           <Row>
            <Col className="">
            
                <b>Name</b>  
                <input type="text" disabled={true} placeholder={selectedRoute.busroute.bus.name} />

                <b>Number Plate</b> 
                <input type="text" disabled={true} placeholder={selectedRoute.busroute.bus.Number_plate} />

                <b>Bus Category</b>
                <input type="text" disabled={true} placeholder={selectedRoute.busroute.buscategory.category}   />
            </Col>
           <Col className="d-flex align-item-center justify-content-center mt-5">
           <img className="busIm" src={`http://127.0.0.1:8000${selectedRoute?.busroute?.bus?.image}`} alt="" />
           </Col>
           </Row>
          </Modal.Body>
        
        </Modal>
      )}
    </div>
  );
}

export default RouteList;
