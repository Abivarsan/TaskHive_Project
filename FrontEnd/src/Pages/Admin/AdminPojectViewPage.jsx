import React from "react";
import Topbar from "../../Components/Common-Components/Topbar";
import Sidebar from "../../Components/Common-Components/Sidebar";
import '../Styles/PageStructure.css'
import AdminProjectView from "../../Components/Admin-Components/AdminProjectView";


export default function AdminProjectViewPage() {
  return (
    <div>
      <div className="FullPage">
        
        <Topbar />
        <Sidebar />
        <div className="Content">
            <h1>Project Details</h1><br/>
            
            <div>
              <AdminProjectView/>
             
            </div>
            
        </div>
        
      </div>
    </div>
  );
}
