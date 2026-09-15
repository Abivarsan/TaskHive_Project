import React from 'react'
import Topbar from "../../../Components/Common-Components/Topbar";
import ProjectManagerSidebar from "../../../Components/Project-Components/ProjectManagerSidebar";
import TaskDetailsCom from '../../../Components/Project-Components/TaskDetailsCom';

export default function PMtaskDetailsPage() {
  return (
    <div>
      <div className="FullPage">
        <Topbar />
        <ProjectManagerSidebar />
        <div className="Content">
          <h2>Task Details</h2>

          <div>
            {/* content */}

            <TaskDetailsCom />
          </div>
        </div>
      </div>
    </div>
  )
}
