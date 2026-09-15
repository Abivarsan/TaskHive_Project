import React from 'react'
import Topbar from "../../Components/Common-Components/Topbar";
import Sidebar from "../../Components/Common-Components/Sidebar";
import '../Styles/PageStructure.css'
import TaskListCom from '../../Components/Project-Components/TaskListCom';

export default function TaskList() {
  return (
    <div>
        <div className="FullPage">
        
        <Topbar />
        <Sidebar />
        <div className="Content">
            <h1>Task List</h1><br/>
            
            {/*---- content --------*/}
            
           <TaskListCom />
            

            <div>
              
            </div>
            
        </div>
        
      </div>
      
    </div>
  )
}
