import React, { useEffect, useState } from 'react'
import './BusOwnerBuses.css'
import { Button, FloatingLabel, Form, Modal, Table } from 'react-bootstrap'
import { addBusApi, getOwnerBusesApi } from '../../BUS_OWNER_SERVICES/busOwnerApis'
import Bus from '../Bus/Bus'
import Swal from 'sweetalert2'


function BusOwnerBuses() {
  const [allBuses, setAllBuses] = useState([])
  const [newBus, setNewBus] = useState({ name: "", Number_plate: "", Engine_no: "", image: "", RC_book: "" })
  const dummyImage = "https://content.hostgator.com/img/weebly_image_sample.png"
  const [preview, setPreview] = useState(dummyImage)
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setNewBus({ name: "", Number_plate: "", Engine_no: "", image: "", RC_book: "" })
    setPreview(dummyImage)
  }
  const handleShow = () => setShow(true);
  const getData = async () => {
    let token = localStorage.getItem('token')
    let headers = {
      "Authorization": `Token ${token}`
    }
    let result1 = await getOwnerBusesApi(headers)
    if (result1.status >= 200 && result1.status < 300) {
      setAllBuses(result1.data)
    }
   
  }
  useEffect(() => { getData() }, [])
  const handleUploadImage = (e) => {
    let file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      setNewBus({ ...newBus, image: file })
    }
    else {
      setPreview(dummyImage)
      setNewBus({ ...newBus, image: "" })
    }
  }
  const handleAdd = async () => {
    let { name, Number_plate, Engine_no, image, RC_book } = newBus
    if (!name || !Number_plate || !Engine_no || !image || !RC_book) {
      Swal.fire({
        icon: "warning",
        title: 'Please fill the form completely',
        showConfirmButton: false,
        timer: 1500
      });
    }
    else {
      const reqBody = new FormData()
      reqBody.append("name", name)
      reqBody.append("Number_plate", Number_plate)
      reqBody.append("Engine_no", Engine_no)
      reqBody.append("image", image)
      reqBody.append("RC_book", RC_book)
      let token = localStorage.getItem('token')
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Token ${token}`
      }
      try {
        let result = await addBusApi(reqBody, reqHeader)
        if (result.status >= 200 && result.status < 300) {
          Swal.fire({
            icon: "success",
            title: "New bus added successfully",
            showConfirmButton: false,
            timer: 1500
          });
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
      <div className='list-table-bus p-md-4 p-2 shadow my-lg-5 mx-auto' >
        <h1>List Of Buses  <Button onClick={handleShow} className='more rounded-4'>Add</Button></h1>
        <Table className='table-transparent striped mt-3 '>
          <thead>
            <tr>
              <th>#</th>
              <th>Bus Name</th>
              <th>Vehicle number</th>
              <th>Engine number</th>
            </tr>
          </thead>
          <tbody>
            {allBuses?.map((i, index) =>
              <Bus data={i} index={index + 1} key={index} getData={getData}/>
            )}
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add new bus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            <input type="file" style={{ display: 'none' }} onChange={e => handleUploadImage(e)} />
            <img src={preview} alt="Add image" className='img-fluid w-100' style={{ cursor: 'pointer' }} />
          </label>
          <FloatingLabel label="Bus name" className="mb-3">
            <Form.Control value={newBus.name} onChange={e => setNewBus({ ...newBus, name: e.target.value })} type="Name" placeholder="Name" />
          </FloatingLabel>
    
          <FloatingLabel label="Vehicle no.">
            <Form.Control value={newBus.Number_plate} onChange={e => setNewBus({ ...newBus, Number_plate: e.target.value })} type="text" placeholder="Vehicle no." />
          </FloatingLabel>
          <FloatingLabel label="Engine No.">
            <Form.Control value={newBus.Engine_no} onChange={e => setNewBus({ ...newBus, Engine_no: e.target.value })} type="text" placeholder="Engine No." />
          </FloatingLabel>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className='mb-0'>Upload RC book</Form.Label>
            <Form.Control type="file" className='mt=0' onChange={e => setNewBus({ ...newBus, RC_book: e.target.files[0] })} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button className="btn-bg" variant="primary" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default BusOwnerBuses