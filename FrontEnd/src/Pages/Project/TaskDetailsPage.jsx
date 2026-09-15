import React from 'react'
import Topbar from "../../Components/Common-Components/Topbar";
import Sidebar from "../../Components/Common-Components/Sidebar";
import '../Styles/PageStructure.css'
import TaskDetailsCom from '../../Components/Project-Components/TaskDetailsCom';

export default function TaskDetailsPage() {
  return (
    <div>
        <div className="FullPage">
        
        <Topbar />
        <Sidebar />
        <div className="Content">
            <h1>Task Details</h1><br/>
            {/*---- content --------*/}
            
           <TaskDetailsCom />
            

            <div>
              
            </div>
            
        </div>
        
      </div>
      
    </div>
  )
}
