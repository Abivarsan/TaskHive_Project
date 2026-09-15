import React from 'react'
import Topbar from '../../Components/Common-Components/Topbar';
import DeveloperSidebar from '../../Components/Developer-Components/DeveloperSidebar';
import ProgressHeader from '../../Components/Developer-Components/ProgressHeader';
import TaskReport from '../../Components/Developer-Components/TaskReport';
import './ReportPage.css'

function ProgressDeveloper() {
  return (
    <div>
    <div className='DeveloperProgress'>
    
      <Topbar />
      <DeveloperSidebar/>

      <div className="Content">

           <ProgressHeader/>

           <div className='MainContent'>

           <TaskReport/>
            
               </div>
        </div>
    
    
    
    </div>
    </div>
  )
}

export default ProgressDeveloper