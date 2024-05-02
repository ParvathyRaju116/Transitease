import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getStopsApi } from '../../BUS_OWNER_SERVICES/busOwnerApis';
import { BASE_URL } from '../../../SERVICES/Base_Url';

function Stops({id}) {
    const [stops,setStops]=useState([])
    const getStops=async()=>{
        let token = localStorage.getItem('token')
        let headers = {
          "Authorization": `Token ${token}`
        }
        let result = await getStopsApi(id,headers)
        if (result.status >= 200 && result.status < 300) {
          setStops(result.data.stops)
        }
    }
    useEffect(() => {getStops()}, [])
    
    return (
        <div>
            {stops?.length > 0 ? (
                <Table className="w-100 hover">
                    <thead className='text-center'>
                        <tr>
                            <th>#</th>
                            <th>Stop Name</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {stops.map((i, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className='fs-4'>{i.place}</td>
                                <td><a href={i.link} target="_blank" style={{cursor:'zoom-in'}}><img src={`${BASE_URL}/${i.image}`} style={{height:'200px',width:'200px'}} alt={`${i.place} image`} /></a></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className='text-danger'><b>No Stops Added Yet !!!</b></p>
            )}
        </div>
    )
}

export default Stops