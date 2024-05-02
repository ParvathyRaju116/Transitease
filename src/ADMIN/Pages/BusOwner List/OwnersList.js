import React, { useEffect, useState } from "react";
import AdminHeader from "../../Components/Admin-Header/AdminHeader";
import { busOwnerViewApi } from "../../../SERVICES/AllAPI";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function OwnersList() {
  const token = localStorage.getItem("token");
  const [busOwner, setBusOwners] = useState([]);
  const ownerview = async () => {
    const header = {
      Authorization: `Token ${token}`,
    };
    const response = await busOwnerViewApi(header);
    setBusOwners(response.data);
    // console.log(response);
  };
  useEffect(() => {
    ownerview();
  }, []);



  return (
    <div>
      <AdminHeader></AdminHeader>

      <div className="m-5">

        <div className="text-center">
          {" "}
          <h1 className="assigneRouteHead">Owners List</h1>
        </div>
        <hr />
        {busOwner.length > 0 ? (
       <div className="d-flex justify-content-center align-item-center">
            <Table className="mt-5  ms-5 me-5 text-center" hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Poof</th>
                </tr>
              </thead>
              <tbody>
                {busOwner.length > 0 ? (
                  busOwner.map((i, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{i.username}</td>
                      <td>{i.address}</td>
                      <td>{i.phone}</td>
                      <td><img height={50} width={100} src={`http://127.0.0.1:8000/${i.proof}`} alt="" /></td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </Table>
       </div>
        ) : (
          <div className="text-center text-danger">
            <p>
              <b>No Owners Registred Yet!!</b>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnersList;
