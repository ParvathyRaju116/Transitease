import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table, Dropdown } from "react-bootstrap";
import {
  addStopApi,
  deleteStopApi,
  editStopApi,
  getOneStopApi,
  getRouteAndStopeApi,
} from "../../../SERVICES/AllAPI";
import Swal from "sweetalert2";
import "./AddStop.css";
import { Label } from "@mui/icons-material";

function AddStop({ id }) {
  const [addshow, setaddShow] = useState(false);
  const [stop, setStop] = useState(null);
  const [photo, setPhoto] = useState(null);
  const token = localStorage.getItem("token");
  const [oneStop, setOneStop] = useState(null);
  const [stopId, setStopId] = useState(null);

  const header = {
    Authorization: `Token ${token}`,
  };

  const handleAddClose = () => setaddShow(false);
  const handleAddShow = () => setaddShow(true);
  const [addStopData, setAddStopData] = useState({
    stop_number: "",
    place: "",
    link: "",
    image: "",
  });
  // console.log(addStopData);

  const [editshow, setEditShow] = useState(false);
  const handleEditClose = () => {
    setEditShow(false);
  };
  const handleEditShow = (id) => {
    getOneStop(id);
  };
  const [editStopInput, setEditStopInput] = useState({
    stop_number: "",
    place: "",
    link: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditStopInput({ ...editStopInput, [name]: value });
  };

  console.log(editStopInput);

  useEffect(() => {
    getRouteAndStop();
  }, []);

  const getRouteAndStop = async () => {
    const response = await getRouteAndStopeApi(id, header);
    setStop(response.data.stops);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setAddStopData((PrevDatails) => ({
      ...PrevDatails,
      image: file,
    }));
  };

  //   add stop
  const addStop = async () => {
    const formData = new FormData();
    formData.append("image", addStopData.image);
    formData.append("stop_number", addStopData.stop_number);
    formData.append("place", addStopData.place);
    formData.append("link", addStopData.link);

    const reqHeaders = {
      Authorization: `Token ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const response = await addStopApi(id, formData, reqHeaders);
    if (response.status == 200) {
      getRouteAndStop();
      handleAddClose();
      Swal.fire({
        icon: "success",
        title: "Stop Added",
        showConfirmButton: false,
        timer: 1500,
      });
      setStop({
        stop_name: "",
        time_taken: "",
        approx_cost: "",
      });
    } else {
      Swal.fire({
        icon: "error",
        text: "Something went wrong!",
        timer: 1200,
      });
    }
    // console.log(response);
  };

  //   get one stop
  const getOneStop = async (e, id) => {
    e.preventDefault();
    console.log(id, "id , get one stop");
    setStopId(id);

    setEditShow(true);
    console.log("getOne Stop", id);
    const response = await getOneStopApi(id, header);
    setEditStopInput({
      stop_number: response.data.stop_number,
      place: response.data.place,
      link: response.data.link,
      image: response.data.image,
    });
    console.log(response);
  };

  const handleImageEdit = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhoto(imageUrl);
      setEditStopInput((prevState) => ({
        ...prevState,
        image: file,
      }));
    }
  };

  // edit stop
  const editStop = async () => {
    const formData = new FormData();
  
    if (typeof editStopInput.image === 'string') {
      formData.append("stop_number", editStopInput.stop_number);
      formData.append("place", editStopInput.place);
      formData.append("link", editStopInput.link);
    } else {
      formData.append("stop_number", editStopInput.stop_number);
      formData.append("image", editStopInput.image)
      formData.append("place", editStopInput.place);
      formData.append("link", editStopInput.link);
    }
  
    const reqHeaders = {
      Authorization: `Token ${token}`,
      "Content-Type": "multipart/form-data",
    };
  
    const response = await editStopApi(stopId, formData, reqHeaders);
    console.log(stopId);
    console.log(response, "edit stop");
    if (response.status === 200) {
      handleEditClose();
      Swal.fire({
        icon: "success",
        title: "Stop Edited",
        showConfirmButton: false,
        timer: 1500,
      });
      getRouteAndStop();
    } else {
      Swal.fire({
        icon: "error..!",
        text: "Something went wrong!",
        timer: 1200,
      });
    }
  };

  //   delete Stop
  const handleDeleteStop = async (e, id) => {
    e.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const response = deleteStopApi(id, header);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            timer: 1200,
          });
          getRouteAndStop();
          // console.log(response);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <div className="w-100 text-center d-flex justify-content-center align-item-center">
        {stop && stop.length > 0 ? (
          <Table className="w-100 hover">
            <thead>
              <tr>
                <th>Stop Number</th>
                <th>Stop Name</th>
                <th>Link</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stop.map((i, index) => (
                <tr key={index}>
                  <td>{i.stop_number}</td>
                  <td style={{ textTransform: "capitalize" }}>{i.place}</td>
                  <td>{i.link}</td>
                  <td>
                    <img
                      className="mapImg"
                      src={
                        i.image
                          ? `http://127.0.0.1:8000/${i.image}`
                          : "https://i.postimg.cc/D0ygtWYd/360-F-248426448-NVKLyw-Wq-Ar-G2-ADUx-Dq6-Qprt-Izs-F82d-MF.jpg"
                      }
                      alt=""
                    />
                  </td>
                  <td>
                    <Dropdown className="mt-4">
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                      ></Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <div
                            onClick={(e) => getOneStop(e, i.id)}
                            className="text-danger"
                          >
                            Edit
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <div
                            onClick={(e) => handleDeleteStop(e, i.id)}
                            className="text-danger"
                          >
                            Delete
                          </div>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-danger">
            <b>No Routes Added Yet !!!</b>
          </p>
        )}
      </div>
      <div className="text-end">
        <Button className="AddBtn me-5" onClick={handleAddShow}>
          <i className="fa-solid fa-plus text-white"></i> Add Stop
        </Button>
      </div>
      <Modal show={addshow} onHide={handleAddClose}>
        <Modal.Header closeButton>
          <Modal.Title className="add-stop-head">Add Stop</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="w-100">
              <div className="d-flex">
                <i className="fa-solid fa-file-signature mt-4"></i>
                <input
                  type="number"
                  placeholder="Stop Number"
                  className="form-control m-3"
                  onChange={(e) =>
                    setAddStopData({
                      ...addStopData,
                      stop_number: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="d-flex">
                <i className="fa-solid fa-file-signature mt-4"></i>
                <input
                  type="text"
                  placeholder="Place"
                  className="form-control m-3"
                  onChange={(e) =>
                    setAddStopData({ ...addStopData, place: e.target.value })
                  }
                  required
                />
              </div>
              <div className="d-flex">
                <i class="fa-solid fa-link mt-4"></i>{" "}
                <input
                  type="text"
                  step="1"
                  placeholder="Link"
                  className="form-control m-3"
                  onChange={(e) =>
                    setAddStopData({ ...addStopData, link: e.target.value })
                  }
                  required
                />
              </div>
              <div className="d-flex">
                <i class="fa-solid fa-map-location-dot mt-4"></i>{" "}
                <input
                  type="file"
                  placeholder="Image"
                  className="form-control m-3"
                  onChange={handleImageChange}
                  required
                />
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="AddBtn" onClick={addStop}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={editshow} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title className="add-stop-head">Edit Stop</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="w-100">
              <div className="d-flex">
                <i className="fa-solid fa-file-signature mt-4"></i>
                <input
                  type="number"
                  value={editStopInput?.stop_number}
                  className="form-control m-3"
                  onChange={(e) =>
                    setEditStopInput({
                      ...editStopInput,
                      stop_number: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="d-flex">
                <i className="fa-solid fa-file-signature mt-4"></i>
                <input
                  type="text"
                  className="form-control m-3"
                  value={editStopInput?.place}
                  name="place"
                  onChange={(e) =>
                    setEditStopInput({
                      ...editStopInput,
                      place: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="d-flex">
                <i class="fa-solid fa-link mt-4"></i>{" "}
                <input
                  type="text"
                  step="1"
                  className="form-control m-3"
                  value={editStopInput?.link}
                  name="link"
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>
              <div className="d-flex">
                <i class="fa-solid fa-map-location-dot mt-4"></i>{" "}
                <label>
                  <img
                    style={{ height: "100px", width: "100%" }}
                    className="ms-3"
                    src={
                      photo || `http://127.0.0.1:8000/${editStopInput.image}`
                    }
                    alt=""
                  />
                  <input
                    style={{ display: "none" }}
                    type="file"
                    placeholder="Image"
                    className="form-control m-3"
                    onChange={handleImageEdit}
                    required
                  />
                </label>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="AddBtn" onClick={editStop}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddStop;
