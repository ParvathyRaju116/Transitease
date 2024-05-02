import React from 'react'
import './Aside.css'
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
    CDBSidebarFooter,
  } from 'cdbreact';
  import Avatar from '@mui/material/Avatar';
  import Stack from '@mui/material/Stack';
import { Link, useNavigate } from 'react-router-dom';


function Aside() {

  const navigate=useNavigate()

  const handleLogOut=()=>{
      localStorage.removeItem("token")
      navigate('/admin-auth')
  }
    
  return (
    <div  >
        <CDBSidebar className='asideBody'>
        <CDBSidebarHeader className='siteName' prefix={<i className="fa fa-bars" />}>
        <img className='logo ' src="https://i.postimg.cc/8z0KPDs6/13a15b0b31789ed21fc556c11f01cd04-removebg-preview.png" alt="" />

            TRANSITEASE</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <Link to={"/add-bus-route"}><CDBSidebarMenuItem> <i class="fa-solid fa-plus me-3 ms-3"></i> All Routes</CDBSidebarMenuItem></Link>
            <Link to={"/admin-assigned-routes"}><CDBSidebarMenuItem > <i class="fa-solid fa-route me-3 ms-3"></i> Assigned Routes</CDBSidebarMenuItem></Link>

            <div onClick={handleLogOut}><CDBSidebarMenuItem > <i class="fa-solid fa-right-from-bracket me-3 ms-3"></i>Log Out</CDBSidebarMenuItem></div>

          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
         <Link to={"/admin-profile"}>
            <div
              className="sidebar-btn-wrapper ms-3"
              style={{padding: '20px 5px',color:"white"}}

            >
              <Stack direction="row" spacing={2}>
        <Avatar alt="Admin" src="/static/images/avatar/1.jpg" /> <h5 className='mt-2'>Admin</h5>
      </Stack>
            </div>
         </Link>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  )
}

export default Aside