import React, { useEffect, useState } from "react";
import AdminHeader from "../../Components/Admin-Header/AdminHeader";
import "./AssignedRoutes.css";
import { Button, Col, Row } from "react-bootstrap";
import { getAssignedRouteApi, getRouteApi } from "../../../SERVICES/AllAPI";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

function AssignedRoutes() {
  const [assignedRoutes, setAssignedRoutes] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [allRouteList, setAllRouteList] = useState([]);
  const [activeRoute, setActiveRoute] = useState(null);
  const token = localStorage.getItem("token");
  const header = {
    Authorization: `Token ${token}`,
  };

  const listRoutes = async () => {
    const response = await getRouteApi(header);
    setAllRouteList(response.data);
    if (response.data.length > 0) {
      setActiveRoute(response.data[0].id); // Make the first route active
    }
  };

  const getAssignedRoutes = async () => {
    const response = await getAssignedRouteApi(header);
    setAssignedRoutes(response.data);
  };

  const filterAssignedRoutes = (id) => {
    const filteredRoutes = assignedRoutes.filter((item) => item.route.id === id);
    setFilteredList(filteredRoutes);
  };

  useEffect(() => {
    listRoutes();
    getAssignedRoutes();
  }, []);

  useEffect(() => {
    if (activeRoute !== null) {
      filterAssignedRoutes(activeRoute);
    }
  }, [activeRoute]);

  const handleCardClick = (id) => {
    setActiveRoute(id);
  };

  return (
    <div>
      <AdminHeader />
      <div className="mt-5 ms-5"></div>

      <div className="assignedRoutesBody mt-3 mb-4 ">
        <h1 className="assigneRouteHead">Assigned Routes</h1>
      </div>
      <hr />

      <div className="ms-5 me-5">
        <Row>
          <Col lg={2}>
            <div className="text-center divWithGradientBorder">
              <h2 className="mt-3">All Routes</h2>
            </div>
            {allRouteList.length > 0 ? (
              allRouteList.map((route, index) => (
                <div className="text-center mt-3 ps-3" key={route.id}>
                  <div
                    className={`fs-5 ${activeRoute === route.id ? 'active-route' : ''}`}
                    onClick={() => handleCardClick(route.id)}
                  >
                    <b>{route.name}</b>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <></>
            )}
          </Col>
          <Col lg={10} className="mt-5 ps-5 justify-content-center align-item-center ">
            <Row className="justify-content-center align-items-center">
              {filteredList.length > 0 ? (
                filteredList.map((route, index) => (
                  <Col lg={4} className="d-flex " key={index}>
                    <Card className="mb-4" style={{height:'500px'}}>
                      <>
                        <CardMedia
                          className=""
                          component="img"
                          height="300"
                          image={`http://127.0.0.1:8000${route.bus.image}`}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="p" component="div">
                            <Row>
                              <Col lg={7}>
                                <b>{route.bus.name}</b>
                              </Col>
                              <Col lg={5}>Category : <b>{route.buscategory.category}</b></Col>
                            </Row>
                          </Typography>
                          <Typography color="text.dark">
                            <Row>
                              <Col lg={7}>Route Time: <b>{route.routetime}</b></Col>
                              <Col lg={5}>Bus Fare : <b>{route.amount}</b></Col>
                            </Row>
                          </Typography>
                          <hr />
                          <Typography color="text.dark">
                            <>Bus Owner : <b>{route.busowner.username}</b></>
                          </Typography>
                          <Typography color="text.dark">
                            <>Number Plate : <b>{route.bus.Number_plate}</b></>
                          </Typography>
                        </CardContent>
                      </>
                    </Card>
                  </Col>
                ))
              ) : (
                <div className="text-center text-danger mt-5 ">
                  <h5>
                    <b>No Buses Assigned In This Route !!!</b>
                  </h5>
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AssignedRoutes;
