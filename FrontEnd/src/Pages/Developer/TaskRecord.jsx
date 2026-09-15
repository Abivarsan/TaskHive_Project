import React from 'react'
import Topbar from '../../Components/Common-Components/Topbar';
import DeveloperSidebar from '../../Components/Developer-Components/DeveloperSidebar';
import TaskHeader from '../../Components/Developer-Components/TaskHeader';
import Task from '../../Components/Developer-Components/Task';

export default function TaskRecord() {





  
  return (
    <div>
    <div className='DeveloperTaskRecord'>
    
      <Topbar />
      <DeveloperSidebar/>

      <div className="Content">
      
      <Task/>
   
        </div>
    
    
    
    </div>
    </div>
  )
}
