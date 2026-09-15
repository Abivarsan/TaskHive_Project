import React, { useState } from 'react'
import Sidebar from '../../Components/Common-Components/Sidebar.jsx'
import Topbar from '../../Components/Common-Components/Topbar.jsx'
import '../Styles/PageStructure.css'
import AdminDashboardComponent from '../../Components/Admin-Components/AdminDashboardComponent.js'
import { useLocation } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div className="FullPage">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Topbar */}
      <Topbar />
      
      {/* Main Content Area */}
      <div className="Content">
       
        
        {/* Dashboard Component */}
        <div className="dashboard-content">
          <AdminDashboardComponent showRateUpdate={true} />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
