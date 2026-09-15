import React from 'react'
import Topbar from '../../../Components/Common-Components/Topbar'
import ProjectManagerSidebar from '../../../Components/Project-Components/ProjectManagerSidebar'
import PMprojectDetailsCom from '../../../Components/Project-Components/Project-Manger-Components/PMprojectDetailsCom'
import AdminProjectView from "../../../Components/Admin-Components/AdminProjectView";


export default function PMprojectDetailsPage() {
  return (
    <div>
        <div className="FullPage">
        
        <Topbar />
        <ProjectManagerSidebar />
        <div className="Content">
            
            <h2>Project Details</h2>
            
            <div>
              {/* content */}
              <AdminProjectView/>
             
            </div>
            
        </div>
        
      </div>
      
    </div>
  )
}
