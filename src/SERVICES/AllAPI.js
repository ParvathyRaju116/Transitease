import { BASE_URL } from "./Base_Url"
import { commonApi } from "./CommonAPI"


// USERS
// api for user registration
export const registerApi=async(body)=>{
    return await commonApi('POST',`${BASE_URL}passengerapi/register/`,body,"")
}

// login api
export const loginApi=async(body)=>{
  return await commonApi('POST',`${BASE_URL}passengerapi/token/`,body,"")
}

// get profile
export const getProfileApi =async(header)=>{
  return await commonApi ('GET',`${BASE_URL}passengerapi/profile/`,"",header)
}

// get routes
export const getRoutesApi=async(reqHeader)=>{
  return await commonApi(`GET`,`${BASE_URL}passengerapi/route/`,reqHeader)
}

// get stops
export const getStopApi=async(id,header)=>{
  return await commonApi(`GET`,`${BASE_URL}passengerapi/route/${id}/`,"",header)
}

// search bus
export const searchBusApi=async(body,header)=>{
  return await commonApi(`POST`,`${BASE_URL}passengerapi/search/`,body,header)
}

// edit profile
export const editProfileApi=async(body,headers)=>{
  return await commonApi('PUT',`${BASE_URL}passengerapi/profile/`,body,headers)
}


// ___________________________________________________________________________________________________________________________________________________________________________


// ADMIN

// api for admin login
export const AdminLoginApi=async(body)=>{
  return await commonApi('POST',`${BASE_URL}adminapi/token/`,body,"")
}

// api for list bus owners
export const busOwnerViewApi=async(headers)=>{
  return await commonApi('GET',`${BASE_URL}adminapi/ownerview/`,"",headers)
}


// api for list of bus
export const busListApi=async(headers)=>{
  return await commonApi('GET',`${BASE_URL}adminapi/bus/`,"",headers)
}

// api for list of Request
export const allRequestListApi=async(headers)=>{
  return await commonApi('GET',`${BASE_URL}adminapi/pendingowners/`,"",headers)
}

// accept request
export const acceptRequestApi=async(id,headers)=>{
  return await commonApi('POST',`${BASE_URL}adminapi/ownerview/${id}/owner_approval/`,"",headers)
}

// get Routes
export const getRouteApi=async(headers)=>{
    return await commonApi('GET',`${BASE_URL}adminapi/route/`,"",headers)
}

// add route
export const addRouteApi=async(body,headers)=>{
  return await commonApi('POST',`${BASE_URL}adminapi/route/`,body,headers)
}

// get route and stop
export const getRouteAndStopeApi=async(id,headers)=>{
   return await commonApi ('GET',`${BASE_URL}adminapi/route/${id}/`,{},headers)
}

// add stop
export const addStopApi=async(id,body,headers)=>{
  return await commonApi('POST',`${BASE_URL}adminapi/route/${id}/add_stop/`,body,headers)
}
// get users list
export const passengerviewApi=async(headers)=>{
  return await commonApi('GET',`${BASE_URL}adminapi/passengerview/`,"",headers)
}

// get One bus 
export const getOnebusApi=async(id,headers)=>{
  return await commonApi('GET',`${BASE_URL}adminapi/bus/${id}/`,"",headers)
}

// get assignedROutes
export const getAssignedRouteApi =async(headers)=>{
  return await commonApi ('GET',`${BASE_URL}adminapi/busroutes/`,"",headers)
}

// delete route
export const deleleRouteApi =async(id,headers)=>{
  return await commonApi('DELETE',`${BASE_URL}adminapi/route/${id}/`,"",headers)
}

// get category
export const getCategoryApi =async(headers)=>{
  return await commonApi ('GET',`${BASE_URL}adminapi/category/`,"",headers)
}

// add new category
export const addNewCategory=async(body,headers)=>{
  return await commonApi('POST',`${BASE_URL}adminapi/category/`,body,headers)
}

// delete category
export const deleteCategoryApi =async(id,headers)=>{
  return await commonApi('DELETE',`${BASE_URL}adminapi/category/${id}/`,"",headers)
}

// delete stop
export const deleteStopApi =async(id,headers)=>{
  return await commonApi('DELETE',`${BASE_URL}adminapi/stop/${id}/`,"",headers)
}

// edit stop
export const editStopApi=async(id,body,headers)=>{
  return await commonApi('PUT',`${BASE_URL}adminapi/stop/${id}/`,body,headers)
}

// delete stop
export const getOneStopApi =async(id,headers)=>{
  return await commonApi('GET',`${BASE_URL}adminapi/stop/${id}/`,"",headers)
}





// __________________________________________________________________________________________________________________________________________________________________________



// BUS OWNER
// register for bus owner
export const busOwnerregisterApi=async(body)=>{
  return await commonApi('POST',`${BASE_URL}owner/register/`,body,"")
}

// login for bus owner
export const busOwnerloginApi=async(body)=>{
  return await commonApi('POST',`${BASE_URL}owner/token/`,body,"")
}
