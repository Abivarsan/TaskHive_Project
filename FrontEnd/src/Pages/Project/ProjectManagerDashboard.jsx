import React from 'react'
import Topbar from '../../Components/Common-Components/Topbar'
import ProjectManagerSidebar from '../../Components/Project-Components/ProjectManagerSidebar'
import AdminDashboardComponent from '../../Components/Admin-Components/AdminDashboardComponent'

export default function ProjectManagerDashboard() {
  return (
    <div>
       <div className="FullPage">
        
        <Topbar />
        <ProjectManagerSidebar />
        <div className="Content">
            <div>

             {/* content */}
             

            <AdminDashboardComponent showRateUpdate={false} /> {/* Hide the RateUpdatePage */}

            </div>
        </div>
        
      </div>
    </div>
  )
}
