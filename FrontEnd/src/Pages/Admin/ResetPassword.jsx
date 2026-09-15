import React from 'react'
import Sidebar from '../../Components/Common-Components/Sidebar'
import Topbar from '../../Components/Common-Components/Topbar'
import '../Styles/PageStructure.css'
import PasswordReset from '../../Components/Admin-Components/PasswordReset'

function ResetPassword() {
  return (
    <div className="FullPage">
      
      <Sidebar/>
      <Topbar/>
     
      <div className="Content">
       
        <PasswordReset/>
     
      </div>
      
    </div>

    
  )
}

export default ResetPassword