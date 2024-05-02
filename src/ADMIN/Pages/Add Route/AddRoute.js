import React, { useEffect, useState } from 'react';
import "./AddRoute.css";
import AdminHeader from '../../Components/Admin-Header/AdminHeader';
import { addRouteApi, deleleRouteApi, getRouteApi } from '../../../SERVICES/AllAPI';
import { Button, Modal } from 'react-bootstrap';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddStop from '../../Components/AddStop/AddStop';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';


function AddRoute() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [routeList, setRouteList] = useState([]);

  const [addRouteData, setAddRouteData] = useState({
    name: "",
    starts_from: "",
    ends_at: ""
  });

  const token = localStorage.getItem("token");
  const header = {
    Authorization: `Token ${token}`
  };

  const listRoutes = async () => {
    const response = await getRouteApi(header);
    setRouteList(response.data);
    // console.log(response.data);
  };

  const deleteRoute = async (e, id) => {
    // console.log(id);
    e.preventDefault();
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          const response = deleleRouteApi(id,header)
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            timer: 1200

          });
          listRoutes()
          // console.log(response);
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
            timer: 1500

          });
        }
      });
    
};

  

  useEffect(() => {
    listRoutes();
  }, []);

  // add bus
  const addRoute = async () => {
    const response = await addRouteApi(addRouteData, header);
    if (response.status === 200) {
      // console.log(response);
      listRoutes();
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Route Added",
        showConfirmButton: false,
        timer: 1500
      });
      setAddRouteData({
        name: "",
        starts_from: "",
        ends_at: ""
      });
    } else {
      Swal.fire({
        icon: "error",
        text: "Something went wrong!",
        timer: 1200
      });
    }

    // console.log(response);
  };


  return (
    <>
      <AdminHeader />

      <div className='add-route--body m-5'>
        <div className='div1 mt-5'>
          <h1 className='all-route-head'>All Routes</h1>
        </div>
        <hr />


        <div className='text-end m-5'>
          <Button className='AddBtn' onClick={handleShow}>
            <i className="fa-solid fa-plus text-white"></i> Add Route
          </Button>
        </div>

    {routeList.length > 0 ?  <div className='list-routes  m-5 ps-5 pe-5'>
          {routeList ?  routeList.map((i, index) => (
            <Accordion className='ps-5 w-100' key={i.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="panel1-header"
                className='d-flex '
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', width: '100%' }}>
                  <h2 style={{ textTransform: 'capitalize' }}>{i?.name}</h2>
                  <div className='ms-auto text-end me-5 pe-5'>
                    <b> Starts From : </b> {i.starts_from} <br />
                    <b> Ends At : </b> {i.ends_at}
                  </div>
                </div>
              </AccordionSummary>
              <div className='text-end me-3'> <button className='dltBtn' onClick={(e) => deleteRoute(e, i.id)}>DELETE ROUTE</button></div>

              <AccordionDetails>

                <div>
                </div>

                <AddStop id={i.id}></AddStop>


              </AccordionDetails>
            </Accordion>
          )):<></>}
        </div>:<div className='text-center text-danger'><p><b>No Routes Added Yet</b></p></div>}

      </div>

      {/* modal for add route */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='add-route-head'>Add Route</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='input text-center '>
            <div className='d-flex w-100 '>
              <i className="fa-solid fa-file-signature fs-3 m-3"></i>
              <input type="text" placeholder='Name' className='form-control shadow' value={addRouteData.name} onChange={(e) => setAddRouteData({ ...addRouteData, name: e.target.value })} />
            </div>
            <div className='d-flex w-100 mt-3 '>
              <i className="fa-solid fa-circle-dot locationIcon fs-3 m-3 " style={{ color: '#FF4B2B' }} ></i>
              <input type="text" placeholder='From' className='form-control shadow' value={addRouteData.starts_from} onChange={(e) => setAddRouteData({ ...addRouteData, starts_from: e.target.value })} />
            </div>
            <br />
            <div className='d-flex'>
              <i className="fa-solid fa-location-dot locationIcon fs-3 m-3 " style={{ color: '#FF416C' }}></i>
              <input type="text" placeholder='To' className='form-control shadow' value={addRouteData.ends_at} onChange={(e) => setAddRouteData({ ...addRouteData, ends_at: e.target.value })} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='AddBtn' onClick={addRoute}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>



    </>


  );
}

export default AddRoute;
