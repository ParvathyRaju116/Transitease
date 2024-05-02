import { BASE_URL } from "../../SERVICES/Base_Url"
import { commonApi } from "../../SERVICES/CommonAPI"

//get buses of specific owner
export const getOwnerBusesApi = async (headers) => {
    return await commonApi('GET', `${BASE_URL}busownerapi/bus/`, "", headers)
}

//get drivers of specific owner busdriver
export const getOwnerDriversApi = async (headers) => {
    return await commonApi('GET', `${BASE_URL}owner/busdriver/`, "", headers)
}

//bus owner registration
export const busOwnerRegistrationApi = async (formdata, headers) => {
    return await commonApi('POST', `${BASE_URL}busownerapi/register/`, formdata, headers)
}
//bus owner login
export const busOwnerLoginApi = async (data) => {
    return await commonApi('POST', `${BASE_URL}busownerapi/token/`, data)
}
//add bus
export const addBusApi = async (body, headers) => {
    return await commonApi('POST', `${BASE_URL}busownerapi/bus/`, body, headers)
}
// add driver 
export const addDriverApi = async (body, headers) => {
    return await commonApi('POST', `${BASE_URL}busownerapi/busdriver/`, body, headers)
}

// get route list 
export const getRoutesApi = async ( headers) => {
    return await commonApi('GET', `${BASE_URL}busownerapi/route/`, "", headers)
}
export const getStopsApi = async ( id,headers) => {
    return await commonApi('GET', `${BASE_URL}busownerapi/route/${id}/`, "", headers)
}

//get assigned routes
export const getAssignedRoutesApi = async (headers) => {
    return await commonApi('GET', `${BASE_URL}busownerapi/routeassign/`, "", headers)
}
// get profile
export const getProfileApi = async (headers) => {
    return await commonApi('GET', `${BASE_URL}busownerapi/profile/`, "", headers)
}

// get categories
export const getCategoriesApi = async (headers) => {
    return await commonApi('GET', `${BASE_URL}busownerapi/category/`, "", headers)
}
//Assign bus api
export const assignBusApi = async (body,headers) => {
    return await commonApi('POST', `${BASE_URL}busownerapi/routeassign/`, body, headers)
}
//get single Assigned route api
export const singleAssignedRouteApi = async (id,headers) => {
    return await commonApi('GET', `${BASE_URL}busownerapi/routeassign/${id}/`, "", headers)
}
//delete single Assigned route api
export const deleteSingleAssignedRouteApi = async (id,headers) => {
    return await commonApi('DELETE', `${BASE_URL}busownerapi/routeassign/${id}/`, "", headers)
}

//get available stops for a route api
export const getAvailableStopsApi = async (id,headers) => {
    return await commonApi('GET', `${BASE_URL}busownerapi/routeassign/${id}/available_stops/`, "", headers)
}

//add stops for assigned route api
export const addStopsApi = async (id,body,headers) => {
    return await commonApi('POST', `${BASE_URL}busownerapi/routeassign/${id}/add_routestop/`,body, headers)
}

//add time and amount stop for api
export const addTimeAndAmountApi = async (id,body,headers) => {
    return await commonApi('POST', `${BASE_URL}busownerapi/stops/${id}/stopdetail/`,body, headers)
}

//get stop details api
export const getStopDetailApi = async (id,headers) => {
    return await commonApi('GET', `${BASE_URL}busownerapi/stops/${id}/stopdetail/`,"", headers)
}

// update profile
export const updateProfileApi = async (reqBody,headers) => {
    return await commonApi('PUT', `${BASE_URL}busownerapi/profile/`, reqBody, headers)
}


// delete stop
export const deleteStopApi = async (id,headers) => {
    return await commonApi('DELETE', `${BASE_URL}busownerapi/stops/${id}/`, "", headers)
}

//update time and amount stop for api
export const updateTimeAndAmountApi = async (id,body,headers) => {
    return await commonApi('PUT', `${BASE_URL}busownerapi/stopdetail/${id}/`,body, headers)
}

//update bus image
export const updateBusImageAPI = async (id,body,headers) => {
    return await commonApi('PUT', `${BASE_URL}busownerapi/bus/${id}/`,body, headers)
}