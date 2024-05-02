import React from 'react'
import Header from '../../Components/Header/Header'
import { Col, Container, Row } from 'react-bootstrap'
import './Home.css'
import Search from '../../Components/Search/Search'
import About from '../../Components/About/About'
import Footer from '../../Components/Footer/Footer'



function Home() {
  return (
    <>
      <Header />

      <div className='home text-white'>     
          <Row className='w-100 text-center'>
            <Col lg={6} className="text-center ps-5">
            <p className="head mt-5 m-5 ms-5 pt-5">Welcome to <b>TRANSITEASE</b></p>
            <p className='mt-5 ms-5 para'>Track your buses in real-time and plan your journey with ease using our Bus Tracking System.</p>
            </Col>
            <Col lg={6}>
            <img className='busImg ' src="https://i.postimg.cc/QCZs39yM/511ab6b0ccd3b3693f27638daeeb82c5-removebg-preview-1.png" alt="Bus" />
            </Col>
          </Row>      
      </div>

      <Search/>

    <section id='about'>  <About/></section>

   <Footer></Footer>
    </>
  )
}

export default Home