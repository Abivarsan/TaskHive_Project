import React from 'react'
import Sidebar from '../../Components/Common-Components/Sidebar'
import Topbar from '../../Components/Common-Components/Topbar'
import BudgetFormEdit from '../../Components/Finance-Components/BudgetFormEdit'

function BudgetEditPage() {
  return (
    
    <div><div className='Budgetedit'>

    <Sidebar/>
    <Topbar/>
    <div className="Content">
    <div className="editpage">
    <BudgetFormEdit/>
    </div>
    </div>
  </div></div>
  )
}

export default BudgetEditPage