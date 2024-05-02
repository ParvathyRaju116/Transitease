import React, { useEffect, useState } from 'react'
import './Verification.css'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

import { allRequestListApi } from '../../../SERVICES/AllAPI';


function Verification() {

  const token = localStorage.getItem("token")
const[allRequest,setAllReqest]=useState([])

  const allRequestList= async () => {
    const header = {
      Authorization: `Token ${token}`
    };
    const response = await allRequestListApi(header)
    setAllReqest(response.data)
  }

  useEffect (()=>{
   allRequestList()
  },[])

  return (
    <div className='p-4 listBody'>
      <h1>Pending List</h1> <br /> <br />
      {allRequest && allRequest.length>0?allRequest.map((i, index)=>(
         <Link key={index} to={`/admin-request/${i.id}`}>
         <Stack direction="row" spacing={2} >
          
          <Avatar
            alt={i.username}
            src="/static/images/avatar/1.jpg"
            sx={{ width: 24, height: 24 }}
          /> <h6>{i.username}</h6>
        </Stack>
        <hr />
        </Link>)):<div className='text-center text-danger'>< ><b>No Pending Request !!</b></></div>}

    </div>
  )
}

export default Verification