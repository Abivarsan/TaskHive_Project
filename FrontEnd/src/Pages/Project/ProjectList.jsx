import React from 'react'
import Topbar from "../../Components/Common-Components/Topbar";
import Sidebar from "../../Components/Common-Components/Sidebar";
import '../Styles/PageStructure.css'
import ProjectListComponent from '../../Components/Project-Components/ProjectListComponent';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function ProjectList() {

  const navigate = useNavigate();

  const HandleAddProject = () => {
    navigate('/ProjectCreation');
  }

  return (
    <div>
      <div className="FullPage">
        
        <Topbar />
        <Sidebar />
        <div className="Content">
          
            <h1>Project List</h1>

            {/* <Button onClick={HandleAddProject} style={{float: 'right', marginRight: '60px'}}>+Add Project</Button> */}
            
            <br/><br/>

            {/*---- content --------*/}
            
            <ProjectListComponent />
            

            <div>
              
            </div>
            
        </div>
        
      </div>
    </div>
  )
}

export default ProjectList