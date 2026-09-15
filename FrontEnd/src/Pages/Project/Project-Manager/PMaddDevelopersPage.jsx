import React from 'react'
import Topbar from '../../../Components/Common-Components/Topbar'
import ProjectManagerSidebar from '../../../Components/Project-Components/ProjectManagerSidebar'
import AddDevelopersCom from '../../../Components/Project-Components/AddDevelopersCom'


export default function PMaddDevelopersPage() {
  return (
    <div>
        <div className="FullPage">
        <Topbar />
        <ProjectManagerSidebar />
        <div className="Content">
          <h2>Add Developers</h2>

          <div>
            {/* content */}

            <AddDevelopersCom />
          </div>
        </div>
      </div>
      
    </div>
  )
}
