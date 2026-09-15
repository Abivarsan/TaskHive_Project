import React from 'react'
import Topbar from "../../Components/Common-Components/Topbar";
import Sidebar from "../../Components/Common-Components/Sidebar";
import '../Styles/PageStructure.css'
import UpdateTaskCom from '../../Components/Project-Components/UpdateTaskCom';

export default function UpdateTaskPage() {
  return (
    <div>
        <div className="FullPage">
        
        <Topbar />
        <Sidebar />
        <div className="Content">
            <h1>Update Task</h1><br/>
            {/*---- content --------*/}
            
            <UpdateTaskCom/>
           
            

            <div>
              
            </div>
            
        </div>
        
      </div>
      
    </div>
  )
}
