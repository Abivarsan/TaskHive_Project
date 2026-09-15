import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


export default function FullTaskListCom() {

    const [list, setList] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const ProId = location.state.selectedId;

    const GetList = async () => {
        const url = `http://localhost:5228/api/FullTaskList?ProId=${ProId}`;

        try {
            const response = await axios.get(url);
            setList(response.data);
            console.log(list);

        } catch (error) {
            alert(error);
        }
    }

    const HandleTaskClick = (id) => {
        const selectedTaskId = id;
        navigate('/TaskDetailsPage', { state: { selectedTaskId, ProId } });
    }

    useEffect(() => {
        GetList();
      },[]);

  return (
    <div>

{(list.length !== 0) ? (
        <></>
      ): (<p style={{color:"#ddd"}}>*no tasks assigned</p>)
      }
      
        <table className="ProjectList">
        <thead>
          <th>Task Id</th>
          <th>Task Name</th>
          <th>Developer Name</th>
          <th>Task Status</th>
        </thead>

        <tbody>
            {list.map((task, index) => (
                <tr key={task.taskId}
                    onClick={() => HandleTaskClick(task.taskId)}
                >
                    <td>{task.taskId}</td>
                    <td>{task.taskName}</td>
                    <td>{task.developerFName} {task.developerLName}</td>
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
