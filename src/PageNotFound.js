import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className='text-center mt-5 pt-5'>
        <img className='' src="https://i.postimg.cc/9Q1hZWvr/search-404-error-3959269-3299968.gif" alt="" />
        <br />
       <Link to={'/home'}> <button>Back To Home</button></Link>
    </div>
  )
}

export default PageNotFound