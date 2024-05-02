import React, { useState } from "react";
import "./Auth.css";
import { loginApi, registerApi } from "../../../SERVICES/AllAPI";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

function Auth() {
  const navigate = useNavigate();
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  const [authData, setAuthData] = useState({
    phone: "",
    address: "",
    email_address: "",
    username: "",
    password: "",
  });
  // console.log(authData);

  // register
  const handleRegister = async (e) => {
    e.preventDefault();

    if (authData.phone.length > 10 || authData.phone.length<10) {
      Swal.fire({
        icon: "error",
        title: "Phone number must have 10 digits",
        showConfirmButton: false,
        timer: 1500,
      });
    
    }
    else{

      const response = await registerApi(authData);
      console.log(response);
      if (response.status == 200) {
        setIsSignUpActive(false);
        setAuthData({
          phone: "",
          address: "",
          username: "",
          password: "",
        });
        Swal.fire({
          icon: "success",
          title: "Account Created",
          text: "Please Login",
          showConfirmButton: false,
          timer: 1200,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "An error occurred while registering",
          showConfirmButton: false,
          timer: 1500,
        });
      }

    }
   

    // console.log(response);
  };

  // login
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await loginApi(authData);
    console.log(response);
    if (response.status == 200 && response.data.user_type=="Passenger") {
      navigate("/home");
      localStorage.setItem("token", response.data.token);
      // console.log(response.data);
    } else {
      Swal.fire({
        icon: "error",
        title: "Incorrect username or password",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    // console.log(response);
  };

  return (
    <div className="auth-Container">
      <div className=" mb-3 drop">
        <Dropdown className="">
          <Dropdown.Toggle className=" " id="dropdown-basic">
            Select User
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={"/"}>
              User
            </Dropdown.Item>
            <Dropdown.Item as={Link} to={"/bus-owner-auth"}>
              Bus Owner
            </Dropdown.Item>
            <Dropdown.Item as={Link} to={"/admin-auth"}>
              Admin
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div
        className={`container ${isSignUpActive ? "right-panel-active" : ""}`}
      >
        <div className="form-container sign-up-container">
          <form action="" onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Username"
              value={authData.username}
              onChange={(e) =>
                setAuthData({ ...authData, username: e.target.value })
              }
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={authData.phone}
              onChange={(e) =>
                setAuthData({ ...authData, phone: e.target.value })
              }
              required
            />
            {/* <PhoneInput
              placeholder="Enter phone number"
              value={authData.phone}
              onChange={
                (value) => setAuthData({ ...authData, phone: value }) // Use value directly from PhoneInput
              }
              required
            /> */}
            <input
              type="text"
              placeholder="Address"
              value={authData.address}
              onChange={(e) =>
                setAuthData({ ...authData, address: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={authData.email_address}
              onChange={(e) =>
                setAuthData({ ...authData, email_address: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={authData.password}
              onChange={(e) =>
                setAuthData({ ...authData, password: e.target.value })
              }
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="" onSubmit={handleLogin}>
            <h1>Sign in</h1>

            <input
              type="text"
              placeholder="Username"
              value={authData.username}
              onChange={(e) =>
                setAuthData({ ...authData, username: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={authData.password}
              onChange={(e) =>
                setAuthData({ ...authData, password: e.target.value })
              }
              required
            />
            <button type="submit">Sign In</button>
          </form>
          <form action="" onSubmit={handleRegister}>
            <h1>Sign in</h1>

            <input
              type="text"
              placeholder="User Name"
              value={authData.email_address}
              onChange={(e) =>
                setAuthData({ ...authData, email_address: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={authData.password}
              onChange={(e) =>
                setAuthData({ ...authData, password: e.target.value })
              }
              required
            />
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Auth;
