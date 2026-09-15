import React from 'react'
import Topbar from '../../Components/Common-Components/Topbar';
import DeveloperSidebar from '../../Components/Developer-Components/DeveloperSidebar';
import TaskHeader from '../../Components/Developer-Components/TaskHeader';
import Tasklist from '../../Components/Developer-Components/Tasklist';

function TaskDeveloper() {
  return (
    <div>
    <div className='DeveloperTask'>
    
      <Topbar />
      <DeveloperSidebar/>

      <div className="Content">
   
      <Tasklist/>
   
        </div>
    
    
    
    </div>
    </div>
  )
}

export default TaskDeveloper