import { Typography } from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";
import "./Footer.css";

function Footer() {
  return (
    <section id="footer">
      <div className="footer-body">
        <Row className="mt-5 ms-5">
          <Col lg={4}>
            <Typography
              className="footerHead  mt-5"
              variant="h6"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
              }}
            >
              <b> TRANSITEASE</b>
            </Typography>
            <div className="">
              <p>
                Revolutionize your city navigation with Bus Tracking Management
                System: your go-to for real-time bus tracking, scheduling, and
                effortless journey planning, empowering you with precise GPS
                updates and user-friendly interfaces for an efficient commute.
              </p>
            </div>{" "}
          </Col>
          <Col className="mt-5 ms-5">
            <h4>
              <b>Services</b>
            </h4>
            <a>Real-time bus tracking</a> <br />
            <a>Effortless journey planning</a> <br />
            <a>User-friendly interfaces</a>
          </Col>
          <Col className="mt-5 ms-5 ps-5">
            <h4>
              <b>Links</b>
            </h4>
            <a href="/">Home</a> <br />
            <a href="#about">About Us</a> <br />
            <a href="/find-bus">Find Bus</a>
          </Col>
          <Col className="mt-5">
            <h4>
              <b>Contact Us</b>
            </h4>
            <i className="fa-solid fa-envelope"></i>{" "}
            <span>@transitease@gmail.com</span>
            <div className="d-flex mt-3">
              <i className="fa-brands fa-instagram me-3"></i>
              <i className="fa-brands fa-facebook me-3"></i>
              <i className="fa-brands fa-twitter"></i>
            </div>
          </Col>
        </Row>
      </div>
      <div className="text-center text-danger">
        <p className="m-1">&#169; 2023 | All rights reserved | Transitease</p>
      </div>
    </section>
  );
}

export default Footer;
