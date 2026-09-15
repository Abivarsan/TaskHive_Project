import React from 'react'
import ClientDetailView from '../../Components/Client-Components/ClientDetailView'
import Sidebar from '../../Components/Common-Components/Sidebar'
import Topbar from '../../Components/Common-Components/Topbar'
import '../Styles/PageStructure.css'

function ViewClientDetail() {
  return (
    <div className="FullPage">
      
      <Sidebar/>
      <Topbar/>
     
      <div className="Content">
       
      <ClientDetailView/>
     
      </div>
      
    </div>
      )
}

export default ViewClientDetail