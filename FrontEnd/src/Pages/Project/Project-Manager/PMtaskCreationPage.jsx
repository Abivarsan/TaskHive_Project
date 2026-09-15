import React from 'react'
import Topbar from '../../../Components/Common-Components/Topbar'
import ProjectManagerSidebar from '../../../Components/Project-Components/ProjectManagerSidebar'
import TaskCreationCom from '../../../Components/Project-Components/TaskCreationCom'

export default function PMtaskCreationPage() {
  return (
    <div>
        <div className="FullPage">
        
        <Topbar />
        <ProjectManagerSidebar />
        <div className="Content">
            
            <h2>Task Creation</h2>
            
            <div>
              {/* content */}
              
              <TaskCreationCom />
             
            </div>
            
        </div>
        
      </div>
      
    </div>
  )
}
