import React from 'react';
import SidebarItem from "./SidebarItem";
import items from "../../Data/sidebar.json";
import Logout from "./Logout";
import "./Styles/Sidebarstyle.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {/* <div className="sidebar-brand">
          Navigation
        </div> */}
      </div>
      
      <nav className="sidebar-nav">
        {items.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </nav>
      
      <Logout />
    </div>
  );
}
