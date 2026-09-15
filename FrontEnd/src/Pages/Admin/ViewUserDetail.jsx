import React from 'react'
import UserDetailView from '../../Components/Admin-Components/UserDetailView'
import Sidebar from '../../Components/Common-Components/Sidebar'
import Topbar from '../../Components/Common-Components/Topbar'
import '../Styles/PageStructure.css'

function ViewUserDetail() {
  return (
    <div className="FullPage">
      
      <Sidebar/>
      <Topbar/>
     
      <div className="Content">
       
      <UserDetailView/>
     
      </div>
      
    </div>
      )
}

export default ViewUserDetail