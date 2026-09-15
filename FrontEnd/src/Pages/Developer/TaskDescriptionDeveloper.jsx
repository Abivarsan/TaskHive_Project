import React from 'react'
import Topbar from '../../Components/Common-Components/Topbar';
import DeveloperSidebar from '../../Components/Developer-Components/DeveloperSidebar';
import TaskDescription from '../../Components/Developer-Components/TaskDescription';




export default function TaskDescriptionDeveloper() {
  return ( <div>
    <div className='DeveloperTask'>
    
      <Topbar />
      <DeveloperSidebar/>

      <div className="Content">

          
            
            <TaskDescription/>

        </div>
    
    </div>
    </div>
  )
}
