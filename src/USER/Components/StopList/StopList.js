import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { getStopApi } from "../../../SERVICES/AllAPI";
import "./StopList.css";

function StopList({ id }) {
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [selectedStop, setSelectedStop] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [stop, setStop] = useState([]);

  // header
  const token = localStorage.getItem("token");
  const header = {
    Authorization: `Token ${token}`,
  };

  // get stop function
  const getStops = async () => {
    try {
      const response = await getStopApi(id, header);
      if (response.data && response.data.bus_route_stops) {
        setStop(response.data.bus_route_stops);
        // console.log(response.data.bus_route_stops);
      } else {
        console.error('Invalid API response format:', response);
      }
    } catch (error) {
      console.error('Error fetching stops:', error);
    }
  };

  useEffect(() => {
    getStops();
  }, [id]);

  const mapView = (selectedStop) => {
    setSelectedStop(selectedStop);
    handleShow();
  };

  return (
    <div>
      <div className="w-100 text-center d-flex justify-content-center align-item-center">
        {stop && stop?.length > 0 ? (
          <Table className="w-100 hover">
            <thead>
              <tr>
                <th>Stop Number</th>
                <th>Stop Name</th>
                <th>Link</th>
                <th>Map</th>
                <th>Time</th>
                <th>Fare</th>
              </tr>
            </thead>
            <tbody>
              {stop.map((i, index) => (
                <tr key={index}>
                  <td>{i.stop?.stop?.stop_number}</td>
                  <td style={{ textTransform: "capitalize" }}>
                    {i.stop?.stop?.place}
                  </td>
                  <td>
                    <a href={i.stop?.stop?.link}>{i.stop?.stop?.link}</a>
                  </td>
                  <td onClick={() => mapView(i)}>
                    <img
                      className="mapImg"
                      src={
                        i.stop?.stop?.image
                          ? `http://127.0.0.1:8000/${i.stop.stop.image}`
                          : "https://i.postimg.cc/D0ygtWYd/360-F-248426448-NVKLyw-Wq-Ar-G2-ADUx-Dq6-Qprt-Izs-F82d-MF.jpg"
                      }
                      alt=""
                    />
                  </td>
                  <td>{i.stop?.stop_detail?.time}</td>
                  <td>{i.stop?.stop_detail?.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="text-danger">
            <h5>No Stops Added!!</h5>
          </div>
        )}
      </div>

      <Modal fullscreen={fullscreen} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Map</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          {selectedStop &&
            selectedStop.stop &&
            selectedStop.stop.stop &&
            selectedStop.stop.stop.image ? (
            <img
              className="mapSinglView"
              src={`http://127.0.0.1:8000/${selectedStop.stop.stop.image}`}
              alt=""
            />
          ) : (
            <img
              className="mapSinglView"
              src="https://i.postimg.cc/D0ygtWYd/360-F-248426448-NVKLyw-Wq-Ar-G2-ADUx-Dq6-Qprt-Izs-F82d-MF.jpg"
              alt=""
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StopList;
