import React from 'react'
import Topbar from '../../../Components/Common-Components/Topbar'
import ProjectManagerSidebar from '../../../Components/Project-Components/ProjectManagerSidebar'
import FullTaskListCom from '../../../Components/Project-Components/FullTaskListCom'


export default function PMFullTaskViewPage() {
  return (
    <div>
        <div className="FullPage">
        <Topbar />
        <ProjectManagerSidebar />
        <div className="Content">
          <h2>Task List</h2>

          <div>
            {/* content */}
            <FullTaskListCom/>
            
          </div>
        </div>
      </div>
      
    </div>
  )
}
