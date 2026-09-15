import React from 'react'
import './Styles/Header.css'
import DeveloperPayment from '../../Pages/Finance/DeveloperPayment'


function Header() {
    return (
<div className="header">

            
            <div className='header-right'>
            <div className="developerpayment">
               <DeveloperPayment/>  
            </div> 
            </div>
            
            
</div>
    )
}

export default Header