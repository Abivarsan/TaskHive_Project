import React from 'react'
import UserCreationForm from '../../Components/Admin-Components/UserCreationForm'
import Sidebar from '../../Components/Common-Components/Sidebar'
import Topbar from '../../Components/Common-Components/Topbar'
import '../Styles/PageStructure.css'

function UserCreation() {
  return (
   
    <div className="FullPage">
      
      <Sidebar/>
      <Topbar/>
     
      <div className="Content">
     
        <UserCreationForm/>
     
      </div>
      
    </div>

    )
}

export default UserCreation