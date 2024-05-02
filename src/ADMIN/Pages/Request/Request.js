import React, { useEffect, useState } from 'react'
import './Request.css'
import AdminHeader from '../../Components/Admin-Header/AdminHeader'
import { Button, Col, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { acceptRequestApi, allRequestListApi } from '../../../SERVICES/AllAPI'
import Swal from 'sweetalert2'




function Request() {
  const token = localStorage.getItem("token")
  const [allRequest, setAllReqest] = useState([])
  const param=useParams()
  const navigate=useNavigate()

  const allRequestList = async () => {
    const header = {
      Authorization: `Token ${token}`
    };
    const response = await allRequestListApi(header)
    setAllReqest(response.data)
    // console.log(response);
  }

  useEffect(() => {
    allRequestList()
  }, [])

  const {id}=param 

  const req= allRequest.find(i=>i.id==id)

  // approval
 const acceptRequest=async ()=>{
  const header = {
    Authorization: `Token ${token}`
  };

  const response=await acceptRequestApi(id,header)
  if(response.status==200){
    Swal.fire({
      icon: "success",
      title: "Approved Bus Owner",
      showConfirmButton: false,
      timer: 1500,
      didClose: () => {
        navigate('/admin-dashbord');
      }
    });
  }
  // console.log(response);
 }

   


  return (
    <div>
      <AdminHeader></AdminHeader>


      <div className=' m-5 d-flex align-item-center justify-content-center'>

        <div className='p-5 reqBody w-75'>
          

          <div className='text-center'><h1 className='mb-3 reqestHead'>Request</h1></div>
        { req &&  <div>
<Row>
  <Col className='proofImg'>
 <div  className='d-flex align-item-center justify-content-center mt-3'> 
 <img className='reqImg' src={req.proof?`http://127.0.0.1:8000/${req.proof}`:"https://i.postimg.cc/GmghkXDV/download-1.png"} alt="" /></div>
  </Col>
  <Col className='mt-5'>
    
                <h5>Name Of Owner : <b>{req.username}</b></h5> 
                <br />
                <h5>Address :  <b>{req.address}</b></h5>        
                <br />
                <h5>Phone Number :  <b>{req.phone}</b></h5>
              
  </Col>
</Row>
          
  
         </div>}
          <div className='text-end'>
           <Link to={'/admin-dashbord'}> <Button className='btn-danger' >Back to Home</Button></Link>
             <Button className='btn-success ms-5' onClick={acceptRequest}>Accept</Button>
          </div>

        </div>

      </div>


    </div>
  )
}

export default Request