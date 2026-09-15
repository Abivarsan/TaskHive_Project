import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import '../Developer-Components/Styles/Content.css'
import { getLoggedUserId } from '../../Auth/ApiService';

function Content() {

  const [teams, setTeams] = useState([]);
  const [developer, setDeveloper] = useState([]);
  const [project, setProject] = useState([]);
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const userid = getLoggedUserId();
    const fetchData = async () => {
      try {
        //DeveloperId == 5
        const response = await axios.get(`http://localhost:5228/api/DeveloperTeam/GetAllTeams/${userid}`);
        setTeams(response.data);
        console.log(teams);
      } catch (error){
        setError(error);
        alert(error);
        console.log("Error occured: " + error);
      } finally {
        setLoading(false);
      }
    };

    const developerData = async () => {
      try {
        //DeveloperId == 5
        const response = await axios.get(`http://localhost:5228/api/DeveloperTeam/DeveloperDescription/${userid}`);
        setDeveloper(response.data);
        console.log(developer);
      } catch (error){
        setError(error);
        alert(error);
        console.log("Error occured: " + error);
      } finally {
        setLoading(false);
      }
    };

    const ProjectCount = async () => {
      try {
        //DeveloperId == 5
        const response = await axios.get(`http://localhost:5228/api/DeveloperTeam/GetDevelopeTotalProjectCount/${userid}`);
        setProject(response.data);
        console.log(project);
      } catch (error){
        setError(error);
        alert(error);
        console.log("Error occured: " + error);
      } finally {
        setLoading(false);
      }
    };

    const TaskCount = async () => {
      try {
        //DeveloperId == 5
        const response = await axios.get(`http://localhost:5228/api/DeveloperTeam/GetDevelopeTotalTaskCount/${userid}`);
        setTask(response.data);
        console.log(task);
      } catch (error){
        setError(error);
        alert(error);
        console.log("Error occured: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    developerData();
   ProjectCount();
   TaskCount();
  }, []);


  var selectedId;


  const TeamSelection = (id) => {
    selectedId = id;
    navigate('/TeamDescriptionDeveloper',{state:{selectedId:selectedId}});
  };

    return (
<div className='ContentMainContent'>

  <div className='CardContent'>
  <div className='MainTitle'><h2>Hi, {developer} ! </h2></div>

  <div className='Cards' style={{ display: 'flex' , gap: '10px' }} >

<div className='Card1'>
<div className='tot'><h4>Total Projects</h4></div>
<div className='count'><h1>{project}</h1></div>
</div>
<div className='Card2'>
<div className='tot'><h4>Total Tasks</h4></div>
<div className='count'><h1>{task}</h1></div>
</div>
  </div>
  </div>
<div className='TeamContent'>
<div className='MainTitle'><h2>Teams</h2></div>
<div className='Newtable'>
      {loading && <p>Loading teams...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <Table striped bordered hover  variant="dark" size='sm'>
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Team Name</th>
              <th>Project Name</th>
              <th>Project Status</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr 
              key={team.projectId}
              onClick = {() =>TeamSelection(team.projectId)}
              >
                <td>{team.projectId}</td>
                <td>{team.teamName}</td>
                <td>{team.projectName}</td>
                <td>{team.projectStatus}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
    </div>
</div>

)
}
    export default Content;