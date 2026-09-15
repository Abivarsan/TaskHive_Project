import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


export default function PMtaskListCom() {

    const location = useLocation();

    const navigate = useNavigate();

    const ProId = location.state.selectedId;
    const DevId = location.state.selectedDevId;

    

    //------------   /////////      get task List     ///////////          ---------------------

  const [list, setList] = useState([]);

  const GetList = async () => {
    const url = `http://localhost:5228/api/TaskList?ProId=${ProId}&DevId=${DevId}`;

    try {
        const response = await axios.get(url);
        setList(response.data);
        console.log(response.data);


    } catch (error) {
        console.log(error);
    }
    console.log(ProId + " " + DevId);
    
  } 
  
  const HandleTaskClick = (id) => {
    const selectedTaskId = id;
    alert(ProId + " " + selectedTaskId);
    navigate('/PMtaskDetailsPage', { state: { selectedTaskId, ProId } });
  }

  useEffect(() => {
    GetList();
  },[]);



  return (
    <div>
      {(list.length !== 0) ? (
        <h5>Developer Name: {list[0].developerFName} {list[0].developerLName}</h5>
      ): (<p style={{color:"#ddd"}}>*no tasks assigned</p>)
      }
        <table className="ProjectList">
        <thead>
          <th>Task Id</th>
          <th>Task Name</th>
          <th>Task Status</th>
        </thead>

        <tbody>
            {list.map((task, index) => (
                <tr key={task.taskId}
                    onClick={() => HandleTaskClick(task.taskId)}
                >
                    <td>{task.taskId}</td>
                    <td>{task.taskName}</td>
                    <td>{task.taskStatus}</td>
                </tr>
            ))}
        </tbody>
        
        {/* <tbody>
            <tr
            //   key={project.proId}
            //   onClick={() => HandleProjectSelection(project.proId)}
            >
              <td></td>
              <td></td>
              <td></td>
            </tr>
        </tbody> */}
        
      </table>
      
    </div>
  )
}
