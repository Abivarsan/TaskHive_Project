import React from 'react'
import ClientCreationForm from '../../Components/Client-Components/ClientCreationForm'
import Sidebar from '../../Components/Common-Components/Sidebar'
import Topbar from '../../Components/Common-Components/Topbar'
import '../Styles/PageStructure.css'

function ClientCreation() {
  return (
   
    <div className="FullPage">
      
      <Sidebar/>
      <Topbar/>
     
      <div className="Content">
     
        <ClientCreationForm/>
     
      </div>
      
    </div>

    )
}

export default ClientCreation
