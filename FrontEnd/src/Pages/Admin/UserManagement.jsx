import UsersManagement from '../../Components/Admin-Components/UserManagement'
import Sidebar from '../../Components/Common-Components/Sidebar'
import Topbar from '../../Components/Common-Components/Topbar'
import '../Styles/PageStructure.css'


import React from 'react'

function UserManagement() {
  return (
  <div className="FullPage">
      
    <Sidebar/>
    <Topbar/>
    
    <div className="Content">
     <div className="dashboard-content">
           <UsersManagement/>
      </div>
    </div>
  </div>
  )
}

export default UserManagement