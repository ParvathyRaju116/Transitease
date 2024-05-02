import React, { useEffect, useState } from 'react'
import './BusOwnerProfile.css'
import BusOwnerAside from '../../Components/BusOwnerAside/BusOwnerAside'
import { getProfileApi, updateProfileApi } from '../../BUS_OWNER_SERVICES/busOwnerApis'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../SERVICES/Base_Url'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function BusOwnerProfile() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState({
    is_approved: "",
    phone: "",
    address: "",
    username: "",
    password: "",
    proof: ""
  })
  const [inputData, setInputData] = useState({ phone: profile.phone, address: profile.address })
  const dummyImage = "https://st.depositphotos.com/3538103/5151/i/450/depositphotos_51514387-stock-photo-photograph-icon.jpg"
  useEffect(() => { setInputData({ phone: profile.phone, address: profile.address }) }, [profile])

  const updateProfile=async()=>{
    if(inputData.address=="" || inputData.phone==""){
      Swal.fire({
        icon: "warning",
        title: "Please fill the form with valid data",
        showConfirmButton: false,
        timer: 1500
      });
    }
    else{
      const token = localStorage.getItem('token')
        const headers = {
            "Authorization": `Token ${token}`
        }
        const result = await updateProfileApi(inputData,headers)
        if (result.status >= 200 && result.status < 300) {
            handleClose1()
            handleClose2()
            getProfile()
            Swal.fire({
              icon: "success",
              title: "Profile updated successfully.",
              showConfirmButton: false,
              timer: 1500
            });
        }
        else if(result.response?.phone){
            Swal.fire({
              icon: "warning",
              title: "Phone number already exists.",
              showConfirmButton: false,
              timer: 1500
            });
        }
        else{
          Swal.fire({
            icon: "erroe",
            title: "Something went wrong. Please try again later.",
            showConfirmButton: false,
            timer: 1500
          });
        }
        console.log(result);
      }
        
  }
  const getProfile = async () => {
    let token = localStorage.getItem('token')
    if (token) {
      let headers = {
        "Authorization": `Token ${token}`
      }
      let result = await getProfileApi(headers)
      if (result.status >= 200 && result.status < 300) {
        setProfile(result.data)
      }
    }
    else {
      navigate('/bus-owner-auth')
      Swal.fire({
        icon: "warning",
        title: 'Please login',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
  useEffect(() => { getProfile() }, [])
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  return (
    <>
      <div className='dashboardBody'>
        <div className='main-grid w-100'>
          <div><BusOwnerAside></BusOwnerAside></div>
          <div>
            <div className="profileBody mt-5 mb-5 pb-3">
              <div className="avatar text-center p-lg-5 p-3 pt-1 pt-lg-1">
                <img
                  className="avatarImg img-fluid"
                  src="https://i.postimg.cc/Yqrt88b9/360-F-633547842-Aug-Yzex-Tp-MJ9z1-Ycp-TKUBoq-BF0-CUCk10.jpg"
                  alt=""
                />
                <h2 className="">{profile?.username}</h2>
                <hr />

                <h5>
                  {profile?.is_approved == 'True' ? <i className="fa-regular fa-circle-check"></i> : <i className="fa-solid fa-circle-xmark"></i>}

                  &nbsp;
                  Status: {profile?.is_approved == 'True' ? "Aproved" : "Pending"}</h5>
                <hr />
                <h5>
                  <i className="fa-solid fa-phone me-3 "></i> {profile?.phone}

                  <Button variant="primary btn-red ms-3 p-1" onClick={handleShow1}>
                  <i className="fa-solid fa-pen"/>
                  </Button>
                </h5>
                <hr />
                <h5>
                  <i className="fa-solid fa-house-user me-3"></i>{" "}
                  {profile?.address}
                  <Button variant="primary btn-red ms-3 p-1" onClick={handleShow2}>
                  <i className="fa-solid fa-pen"/>
                  </Button>


                </h5>
                <hr />
                <div className='d-flex justify-content-evenly'>
                  <h5 className='text-end w-50 fw-normal'>
                    <i className="fa-solid fa-id-badge"></i>  &nbsp;
                    Proof:</h5>
                  <div className='w-75'>
                    <img src={profile.proof ? `${BASE_URL}/${profile.proof}` : dummyImage} alt="Proof" className='img-fluid shadow' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      {/* Edit phone number */}
      <Modal show={show1} onHide={handleClose1} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Update phone no.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="tel" className='form-control' value={inputData.phone} onChange={(e)=>setInputData({...inputData,phone:e.target.value})} required minLength={10} maxLength={10}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" className="btn-red" onClick={updateProfile}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      {/* edit address */}
      <Modal show={show2} onHide={handleClose2} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Update address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <textarea type="tel" className='form-control' value={inputData.address} onChange={(e)=>setInputData({...inputData,address:e.target.value})} required/>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" className="btn-red" onClick={updateProfile}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default BusOwnerProfile