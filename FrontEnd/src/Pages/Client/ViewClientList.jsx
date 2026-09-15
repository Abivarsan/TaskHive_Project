

import ClientList from '../../Components/Client-Components/ClientList'
import Sidebar from '../../Components/Common-Components/Sidebar'
import Topbar from '../../Components/Common-Components/Topbar'
import '../Styles/PageStructure.css'


import React from 'react'

function ViewClientList() {
  return (
    <div className="FullPage">
      
    <Sidebar/>
    <Topbar/>
    
    <div className="Content">
   
      <ClientList/>
   
    </div>
    
  </div>
  )
}

export default ViewClientList