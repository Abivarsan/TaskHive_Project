import React from 'react'
import Sidebar from '../../Components/Common-Components/Sidebar';
import Topbar from '../../Components/Common-Components/Topbar';
import Transaction from '../../Components/Finance-Components/Transaction';

function TransactionPage() {
  return (
    <div className='Transaction'>
      <Sidebar/>
      <Topbar/>
      <div className="Content">
      <div className="reportcontent">
       <Transaction/>
      </div>
      </div>
    </div>
  )
}

export default TransactionPage