import React from 'react'
import Sidebar from '../../Components/Common-Components/Sidebar';
import '../Styles/PageStructure.css'
import Topbar from '../../Components/Common-Components/Topbar';
import Piechart from '../../Components/Finance-Components/Piechart';
import Barchart from '../../Components/Finance-Components/Barchart';
import "./FinanceDigramStyle.css";
import { useLocation } from 'react-router-dom';

function FinanceDigram() {
  const location=useLocation();
  const projectId= location.state.projectId;

  return (
    <div className='Financedigram'>
    <Sidebar/>
    <Topbar/>
    <div className="Content">
      <div className="title">
      <b>Finance Summary</b>
      </div>
      <div className="digrams">
      <div className='Piechart'>
        <div className="Dname">
          <b>Budget Summary</b>
        </div>
      <Piechart projectid={projectId}/>
      </div>
      <div className="Barchart">
      <div className="Dname">
          <b>Income-Expence Summary</b>
        </div>
        <Barchart projectid={projectId}/>
      </div>
      </div>
    </div>
  </div>
  )
}

export default FinanceDigram