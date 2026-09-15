import React from 'react'
import SidebarItem from '../Common-Components/SidebarItem';
import items from "../../Data/Developersidebar.json"
import Logout from '../Common-Components/Logout';
import "../Common-Components/Styles/Sidebarstyle.css";

function DeveloperSidebar() {


  return (
    
    <div className="sidebar">
    <hr />
    <span className="workspace">
     {/* <font size="7" align="center">T</font><font>askhive workspace</font>
     <hr></hr> */}
    </span>
    { items.map((item, index) => <SidebarItem key={index} item={item} />) }
    <Logout/>
  </div>
  
  )
}

export default DeveloperSidebar