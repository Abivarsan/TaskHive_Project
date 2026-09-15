import React, { useEffect } from "react";
import "./Styles/ProjectListCSS.css";
import { useState } from "react";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

export default function AddDevelopersCom() {
  const [developer, setDevelper] = useState([]);
  const [add, setAdd] = useState([]);


  

  const navigate = useNavigate();

  const location = useLocation();
  const selectedId = location.state.selectedId;

  const SetList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5228/api/AddDevelopers"
      );
      setDevelper(response.data);
      console.log(developer);
    } catch (error) {
      console.log("Error occured: " + error);
    }
  };


  const [developers, setDevelopers] = useState([]);

  const GetAddedDevelopers = async () => {
    const url = `http://localhost:5228/api/CheckAddedDevelopers/${selectedId}`;
    try {
      const response = await axios.get(url); 
      setDevelopers(response.data);
      console.log(developers);
    } catch (error) {
      console.error(error);
    } 
  };



  //--------developer check

  

  const CheckDev = (id) => {
    var i;
    for(i = 0; i < developers.length; i++){
      if(id === developers[i].developerId){
        return true;
      }
    }
    return false;
  }


  const CurrentAddition = (id) => {
    var i;
    var new1 = add;
    for(i = 0; i < new1.length; i++){
      if(id === new1[i]){
        console.log('zzzz');
        return true;
      }
    }
    return false;
  }


  //---------DEveloper Addition
  const [count, setCount] = useState(0);
  //var addedId;

  const HandleAdd = (id) => {
    setCount(count + 1);
    console.log(id + " clicked");
    const newAdd = add;

    for (var i = 0; i < count; i++) {
      if (id === newAdd[i]) {
        console.log()
        alert("Already added");
        return;  
      }
    }
    newAdd.push(id);
    setAdd(newAdd);

    console.log(add);
  };

  //--------DEveloper Remove

  const HandleRemove = (id) => {
    const newAdd = add;

    var index;
    for (var i = 0; i < add.length; i++) {
      if (id === add[i]) {
        index = i;
        console.log(index);
        break;
      }
    }
    if (add[index] === id) {
      newAdd.splice(index, 1);
      setAdd(newAdd);

      console.log(add);
    } else {
      alert("Not added");
    }
  };

  //-------------check availability
  // const checkAvailability = async () => {
  //   const addedDev = await axios.get(`https://localhost:44319/api/CheckAddedDevelopers/${selectedId}`);
  //   setCheck(addedDev);

  //   var count = check.length;
  //   for (var i = 0; i < count; i++){
  //     if(check[i].developerId === developer.userId){
  //     return(
  //       <td>Added</td>
  //     );

  //   }}

  //     return(
  //       <td>not added</td>
  //     );

  //   }

  // const assignedDev = axios.get("");
  // setCheck(assignedDev);



  useEffect(() => {
    SetList();
    GetAddedDevelopers();
    CurrentAddition();

    
    //checkAvailability();
  });

  //email data

  const SendEmail = async () => {
    const urlEmail = `http://localhost:5228/api/EmailSend/DeveloperAssign?projectId=${selectedId}`;
    if (window.confirm('Do you want to send Emails?')){
      axios.post(urlEmail, add)
    .then(alert("Email sent"))
    .catch(console.error());
    }
    
  }

  const HandleSubmit = async () => {
    for (var i = 0; i < add.length; i++) {
      const data = {
        projectId: selectedId,
        developerId: add[i],
      };
      const url = "http://localhost:5228/api/AddDevelopers";

      axios
        .post(url, data)
        .then(console.log("succes"))
        .catch((e) => alert(e));
    }

    alert("Developers added: " + add);
    SendEmail();
    console.log("clicked");
    navigate(-1);
  };

  return (
    <div>
      <table className="ProjectList">
        <thead>
          <th>Developer Id</th>
          <th>Developer Username</th>
          <th>Job Role</th>
          <th></th>
          <th>Add/Remove </th>
          <th>Status</th>
          
        </thead>

        <tbody>

        {(developer.length === 0) ? (
            <Spinner size="lg" animation="border" style={{marginLeft: "75px", marginTop: "35px", marginBottom: "35px"}} />
          ): <></>}

          {developer.map((dev, index) => (
            <tr key={dev.userId}>
              <td>{dev.userId}</td>
              <td>{dev.userName}</td>
              <td>{dev.jobRoleName}</td>
              

              {/* <td>
                <Button variant="primary" onClick={() => HandleAdd(dev.userId)}>
                  Add
                </Button>
                &nbsp;&nbsp;
                <Button
                  variant="danger"
                  onClick={() => HandleRemove(dev.userId)}
                >
                  Remove
                </Button>
              </td> */}

              <td>
                {CurrentAddition(dev.userId) ? (
                  <><i class="bi bi-check-circle-fill"></i></>
                ) : (
                  <></>
                )}
              </td>
              <td>
              {CheckDev(dev.userId) ? (
                  <>
                  <Button style={{backgroundColor: '#4f5469'}} disabled variant="primary" onClick={() => HandleAdd(dev.userId)}>
                  Add
                </Button>
                &nbsp;&nbsp;
                <Button
                disabled
                style={{backgroundColor: '#684848'}}
                  variant="danger"
                  onClick={() => HandleRemove(dev.userId)}
                >
                  Remove
                </Button></>
                ) : (
                  <>
                  <Button variant="primary" onClick={() => HandleAdd(dev.userId)}>
                  Add
                </Button>
                &nbsp;&nbsp;
                <Button
                  variant="danger"
                  onClick={() => HandleRemove(dev.userId)}
                >
                  Remove
                </Button></>
                )}
              </td>

             <td>
                {CheckDev(dev.userId) ? (
                  <>added</>
                ) : (
                  <>Not added</>
                )}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <p></p>
      <br />
      <Button onClick={HandleSubmit} variant="primary">
        Submit
      </Button>
    </div>
  );
}
