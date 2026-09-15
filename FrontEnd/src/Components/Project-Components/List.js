import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./ListCSS.css";

function Projectlist() {
  const [data, setData] = useState([]);

  //const url = "https://localhost:44319/api/ViewProjectList";

  useEffect(() => {
    axios
      .get("http://localhost:5228/api/ViewProjectList")
      .then((result) => setData(result.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="container">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Project Id</th>
            <th scope="col">Project Name</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((project, index) => {
            return (
              <tr>
                <td>{project.proId}</td>
                <td>{project.projectName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Projectlist;
