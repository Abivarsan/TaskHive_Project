import React from 'react'
import Topbar from "../../Components/Common-Components/Topbar";
import Sidebar from "../../Components/Common-Components/Sidebar";
import '../Styles/PageStructure.css'
import FullTaskListCom from '../../Components/Project-Components/FullTaskListCom';

export default function FullTaskListPage() {
  return (
    <div>
        <div className="FullPage">
        
        <Topbar />
        <Sidebar />
        <div className="Content">
            <h1>Task List</h1><br/>
            {/*---- content --------*/}
            <FullTaskListCom/>
           
            

            <div>
              
            </div>
            
        </div>
        
      </div>
      
    </div>
  )
}
