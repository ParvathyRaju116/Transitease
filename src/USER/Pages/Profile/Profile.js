import React, { useEffect, useState } from "react";
import "./Profile.css";
import Header from "../../Components/Header/Header";
import Modal from "react-bootstrap/Modal";
import { editProfileApi, getProfileApi } from "../../../SERVICES/AllAPI";
import Swal from "sweetalert2";


function Profile() {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState({
    email:"",
    phone:"",
    address:""
  });
  const [editInputs, setEditInputs] = useState({
    phone: "",
    address: "",
  });

  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({...profile, [name]: value });
  };
  console.log(editInputs);



  // get profile
  const getProfile = async () => {
    const header = {
      Authorization: `Token ${token}`,
    };
    const response = await getProfileApi(header);
    console.log(response);
    setProfile({
      phone:response.data.phone,
      address:response.data.address,
      email:response.data.email_address,
      username:response.data.username
    })
    console.log(profile);
  };

  const editProfile = async () => {
    const header = {
      Authorization: `Token ${token}`,
    };
    const response = await editProfileApi(profile,header);
    console.log(response);
    if(response.status==200){
      getProfile()
      handleClose()
      Swal.fire({
        icon: "success",
        title: "Profile Details Updated",
        showConfirmButton: false,
        timer: 1200,
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Header />
      <div className="text-center">
        <h1 className="profileHead mt-4">My Profile</h1>
      </div>

      <div className="profileBody mt-2 mb-5 pb-3">
        <div className="avatar text-center">
          <div onClick={handleShow} className="text-end me-3  mt-3">
            {" "}
            <i class="fa-solid fa-pen-to-square"></i>
          </div>

          <img
            className="avatarImg"
            src="https://i.postimg.cc/Yqrt88b9/360-F-633547842-Aug-Yzex-Tp-MJ9z1-Ycp-TKUBoq-BF0-CUCk10.jpg"
            alt={profile && profile.username}
          />

          {profile ? (
            <>
              <h2>{profile.username}</h2>
              <div className="text-start ps-5 me-5 pe-5 ms-5 pb-5">
                <h5 className="mt-5">
                  <i className="fa-solid fa-envelope me-3"></i>
                  {profile.email}
                </h5>
                <hr />
                <h5>
                  <i className="fa-solid fa-phone me-3"></i>
                  {profile.phone}
                </h5>
                <hr />
                <h5>
                  <i className="fa-solid fa-house-user me-3"></i>
                  {profile.address}
                </h5>
              </div>
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="profileHead">Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      
        <i className="fa-solid fa-phone me-3"></i>Phone{' '}
      <input
        type="tel"
        name="phone" 
        value={profile?.phone}
        onChange={(e) => handleInputChange(e)}
      />
      <br />
      <i className="fa-solid fa-house-user me-3"></i>Address{' '}
      <input
        type="text"
        name="address" 
        value={profile?.address}
        onChange={(e) => handleInputChange(e)}
 
      />
       
        </Modal.Body>
        <Modal.Footer>
          <button onClick={editProfile}>Save Changes</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Profile;
