import React from 'react'
import Topbar from "../../Components/Common-Components/Topbar";
import Sidebar from "../../Components/Common-Components/Sidebar";
import '../Styles/PageStructure.css'
import UpdateProjectCom from '../../Components/Project-Components/UpdateProjectCom';

export default function UpdateProjectPage() {
  return (
    <div>
        <div className="FullPage">
        
        <Topbar />
        <Sidebar />
        <div className="Content">
            <h1>Update Project</h1><br/>
            {/*---- content --------*/}
            <UpdateProjectCom/>
            
           
            

            <div>
              
            </div>
            
        </div>
        
      </div>
      
    </div>
  )
}
