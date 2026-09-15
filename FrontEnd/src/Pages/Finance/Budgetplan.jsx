import React from 'react'
import '../Styles/PageStructure.css'
import Sidebar from '../../Components/Common-Components/Sidebar';
import Topbar from '../../Components/Common-Components/Topbar';
import Budgetreport from '../../Components/Finance-Components/Budgetreport';



function Budgetplan() {
  return (
    <div className='Budgetplan'>
      <Sidebar/>
      <Topbar/>
      <div className="Content">
      <div className="reportcontent">
        <Budgetreport/>
      </div>
      </div>
    </div>
  )
}

export default Budgetplan