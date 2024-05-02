import React, { useEffect, useState } from 'react'
import './Bus.css'
import { Badge, Button, ListGroup, Modal } from 'react-bootstrap';
import { BASE_URL } from '../../../SERVICES/Base_Url';
import { updateBusImageAPI } from '../../BUS_OWNER_SERVICES/busOwnerApis';
import Swal from 'sweetalert2';


function Bus({ data, index, getData }) {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [uploadImage, setUploadImage] = useState('')
  const [preview, setPreview] = useState('')
  useEffect(() => {
    if (uploadImage) {
      try { setPreview(URL.createObjectURL(uploadImage)) }
      catch (err) {
        console.log(err);
      }
    }
  }, [uploadImage])


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => { setShow2(false); setUploadImage(''); setPreview('') }
  const handleShow2 = () => setShow2(true);
  const handleUpdateImage = async () => {
    if (uploadImage) {
      const formData = new FormData()
      formData.append("image", uploadImage)
      // headers 
      try {
        let token = localStorage.getItem('token')
        const headers = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Token ${token}`
        }
        const response = await updateBusImageAPI(data.id, formData, headers)
        if (response.status >= 200 && response.status < 300) {
          Swal.fire({
            icon: "success",
            title: "Image updated successfully",
            showConfirmButton: false,
            timer: 1500
          });
          getData()
          handleClose2()
        }
        else {
          Swal.fire({
            icon: "warning",
            title: "Something went wrong",
            showConfirmButton: false,
            timer: 1500
          });
          console.log(response.response);
          console.log(token);
        }
      } catch (error) {
        console.log(error);
      }
    }
    else {
      Swal.fire({
        icon: "warning",
        title: "Please upload an image.",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  return (

    <>
      <tr>
        <td>{index}</td>
        <td >{data?.name}</td>
        <td>{data?.Number_plate}</td>
        <td>{data?.Engine_no}</td>
        <td>
          <Button variant="primary" className='more' onClick={handleShow}>
            More
          </Button></td>
      </tr>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{data?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='text-center py-2'>
            {data?.image ? <><img src={`${BASE_URL}/${data?.image}`} alt={data?.name} className='img-fluid w-75' /> <Button className='btn-red' onClick={handleShow2}><i className='fa-solid fa-pen' /></Button></> : "No image provided"}
            <br />

          </div>
          <ListGroup>
            <ListGroup.Item> Vehicle no. : {data?.Number_plate}</ListGroup.Item>
            <ListGroup.Item>Engine no. :{data?.Engine_no}</ListGroup.Item>
            RC_book:
          </ListGroup>
          <div className='w-100 text-center'>
            {data?.RC_book ? <img src={`${BASE_URL}/${data?.RC_book}`} alt={`${data?.name} RC Book`} className='img-fluid' /> : "Not provided"}
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={show2} onHide={handleClose2} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex flex-column justify-content-center align-items-center py-2'>
            {preview && <img src={preview} alt='preview' className='img-fluid w-75' />}
            <label>
              <input type="file" accept="image/png, image/jpeg" onChange={(e) => setUploadImage(e.target.files[0])} style={{ display: 'none' }} />
              <div className='btn-red'>Upload image</div></label>
            <br />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-secondary' onClick={handleClose2}>Cancel</Button>
          <Button className='btn-red' onClick={handleUpdateImage}>Update</Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default Bus