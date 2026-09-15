import React from "react";
import Topbar from "../../../Components/Common-Components/Topbar";
import ProjectManagerSidebar from '../../../Components/Project-Components/ProjectManagerSidebar'
import ProjectCreationForm from "../../../Components/Project-Components/Project-Manger-Components/ProjectCreationForm";


export default function ProjectCreation() {
  return (
    <div>
      <div className="FullPage">
        
        <Topbar />
         <ProjectManagerSidebar />
        <div className="Content">
            
            <div>
              <ProjectCreationForm />
            </div>
            
        </div>
        
      </div>
    </div>
  );
}
