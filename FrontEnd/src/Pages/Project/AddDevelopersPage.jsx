import React from 'react'
import Topbar from "../../Components/Common-Components/Topbar";
import Sidebar from "../../Components/Common-Components/Sidebar";
import '../Styles/PageStructure.css'
import AddDevelopersCom from '../../Components/Project-Components/AddDevelopersCom';

export default function AddDevelopersPage() {
  return (
    <div>
        <div className="FullPage">
        
        <Topbar />
        <Sidebar />
        <div className="Content">
            <h1>Add Developers</h1><br/>
            {/*---- content --------*/}
            
           <AddDevelopersCom/>
            

            <div>
              
            </div>
            
        </div>
        
      </div>
      
    </div>
  )
}
