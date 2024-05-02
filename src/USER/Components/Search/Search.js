import React from 'react'
import './Search.css'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Search() {
    return (
        <div className='justify-content-center texy-center d-flex mb-5'>

            <div className="searchBody  text-center ">
                <h1 className='m-4 searchHead'>Find My Bus</h1>
                <div className='d-flex w-100 justify-content-center align-item-center'>
                    <Link to={'/find-bus'}><button className=' searchBtn'>Search</button></Link>

                </div>            
                </div>

        </div>
    )
}

export default Search