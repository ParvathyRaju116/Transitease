import React, { useEffect, useState } from "react";
import "./AddCategory.css";
import { Button, Col, Modal, Row } from "react-bootstrap";
import {
  addNewCategory,
  deleteCategoryApi,
  getCategoryApi,
} from "../../../SERVICES/AllAPI";
import Swal from "sweetalert2";

function AddCategory() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [category, setCategory] = useState([]);

  const [catInput, setCatInput] = useState({
    category: "",
  });

  // console.log(catInput);
  const token = localStorage.getItem("token");
  const header = {
    Authorization: `Token ${token}`,
  };

  const getCategory = async () => {
    const response = await getCategoryApi(header);
    setCategory(response.data);
    // console.log(response.data);
  };

  const handleDelete = async (e, id) => {
    getCategory();

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
          const response = deleteCategoryApi(id, header);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            timer: 1200,
          });
          getCategory();
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

  const addCategory = async () => {
    const response = await addNewCategory(catInput, header);
    if (response.status === 200) {
      getCategory();
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Category Added",
        showConfirmButton: false,
        timer: 1500,
      });
      setCatInput({
        category: "",
      });
      handleClose();
    } else {
      Swal.fire({
        icon: "error",
        text: "Something went wrong!",
        timer: 1200,
      });
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="category-body shadow categories">
      <div className="">
        <Row>
          <Col lg={10}>
            {" "}
            <h2>Categories</h2>
          </Col>
          <Col lg={2}>
            <div className="text-end me-3 mt-3">
              <Button onClick={handleShow} className="ctgry-add-btn">
                <i class="fa-solid fa-plus"></i>
              </Button>
            </div>
          </Col>
        </Row>
        <hr />

        <div className="">
          {category && category.length > 0 ? (
            category.map((i, index) => (
              <div className="ps-4 ">
                {index + 1}) <b>{i.category}</b>
                <div
                  className="text-end text-danger"
                  onClick={(e) => handleDelete(e, i.id)}
                >
                  {" "}
                  <i class="fa-solid fa-trash-can"></i>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="New Category"
            value={catInput.category}
            onChange={(e) =>
              setCatInput({ ...catInput, category: e.target.value })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="ctgry-add-btn p-1"
            variant="primary"
            onClick={addCategory}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddCategory;
