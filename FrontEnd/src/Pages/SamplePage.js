import React from "react";
import Topbar from "../Compornents/Topbar";
import Sidebar from "../Compornents/Sidebar";
import './PageStructure.css'

export default function SamplePage() {
  return (
    <div>
      <div className="FullPage">
        
        <Topbar />
        <Sidebar />
        <div className="Content">
            <h1>Content</h1><br/>
            
            
        </div>
        
      </div>
    </div>
  );
}
