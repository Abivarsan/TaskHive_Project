import React from 'react'
import Topbar from '../../Components/Common-Components/Topbar';
import DeveloperSidebar from '../../Components/Developer-Components/DeveloperSidebar';
import Projectlist from '../../Components/Developer-Components/Projectlist';
import ProjectHeader from '../../Components/Developer-Components/ProjectHeader';


function ProjectDeveloper() {
  return (
    <div>
    <div className='DeveloperProject'>
    
      <Topbar />
      <DeveloperSidebar/>

      <div className="Content">

          
            
            <Projectlist/>

        </div>
    
    </div>
    </div>
  )
}

export default ProjectDeveloper