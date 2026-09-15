import React from 'react'
import Topbar from '../../Components/Common-Components/Topbar'
import Sidebar from '../../Components/Common-Components/Sidebar'
import TaskCreationCom from '../../Components/Project-Components/TaskCreationCom'

function TaskCreation() {
  return (
    <div>

<div className="FullPage">
        
        <Topbar />
        <Sidebar />
        <div className="Content">
            {/* <h1>Task Creation</h1><br/> */}
            
            <div>
              <TaskCreationCom/>
             
            </div>
            
        </div>
        
      </div>
      
    </div>
  )
}

export default TaskCreation