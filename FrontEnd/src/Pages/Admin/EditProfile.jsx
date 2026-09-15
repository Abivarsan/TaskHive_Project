import React from 'react'
import Sidebar from '../../Components/Common-Components/Sidebar'
import Topbar from '../../Components/Common-Components/Topbar'
import '../Styles/PageStructure.css'
import EditProfileComponent from '../../Components/Admin-Components/EditProfile'

function EditProfile() {
  return (
   
    <div className="FullPage">
      
      <Sidebar/>
      <Topbar/>
     
      <div className="Content">
     
        <EditProfileComponent/>
     
      </div>
      
    </div>

    )
}

export default EditProfile