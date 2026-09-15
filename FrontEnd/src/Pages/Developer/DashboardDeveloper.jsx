import React from 'react'
import Topbar from '../../Components/Common-Components/Topbar';
import DeveloperSidebar from '../../Components/Developer-Components/DeveloperSidebar';
import Header from '../../Components/Developer-Components/Header';
import Content from '../../Components/Developer-Components/Content';

function DashboardDeveloper() {
  return (
    <div>
    <div className='DeveloperDashboard'>
    
      <Topbar />
      <DeveloperSidebar/>

      <div className="Content">
      {/* <Header/> */}
   
     <Content/>
        </div>
    </div>
    </div>
  )
}

export default DashboardDeveloper