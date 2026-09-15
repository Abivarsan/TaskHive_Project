import React from 'react'
import Topbar from '../../Components/Common-Components/Topbar';
import DeveloperSidebar from '../../Components/Developer-Components/DeveloperSidebar';
import ModuleReport from '../../Components/Developer-Components/ModuleReport';
import './ReportPage.css'

function ProjectModuleReport() {
  return (
   
    <div>
    <div className='DeveloperProject'>
    
      <Topbar />
      <DeveloperSidebar/>

      <div className="Content">
          
           <div className='MainContent'>
           
        <ModuleReport/>
  
          </div>
      </div>
    
    </div>
    </div>
  )
}

export default ProjectModuleReport