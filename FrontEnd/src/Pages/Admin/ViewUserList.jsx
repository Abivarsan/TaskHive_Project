import UserList from '../../Components/Admin-Components/UserList'
import Sidebar from '../../Components/Common-Components/Sidebar'
import Topbar from '../../Components/Common-Components/Topbar'
import '../Styles/PageStructure.css'


import React from 'react'

function ViewUserList() {
  return (
    <div className="FullPage">
      
    <Sidebar/>
    <Topbar/>
    
    <div className="Content">
      <div className="dashboard-content">
      <UserList/>
      </div>
    </div>
    </div>
  )
}

export default ViewUserList