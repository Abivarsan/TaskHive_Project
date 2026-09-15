import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Styles/Sidebaritemstyle.css";
import { useAuth } from "../../Auth/AuthContext";

export default function SidebarItem({ item }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  // Check if the user has access to the item
  const hasAccess = (item) => {
    if (!item.roles) return true;
    return item.roles.includes(String(user?.userCategoryId));
  };

  // Check if current path matches item path
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Check if any child is active
  const hasActiveChild = (children) => {
    if (!children) return false;
    return children.some(child => isActive(child.path));
  };

  if (!hasAccess(item)) {
    return null;
  }

  const handleToggle = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  // If item has children (dropdown)
  if (item.childrens) {
    return (
      <div className={`sidebar-item ${open ? 'open' : ''}`}>
        <div 
          className={`sidebar-title ${hasActiveChild(item.childrens) ? 'active' : ''}`}
          onClick={handleToggle}
        >
          <span>
            <i className={item.icon}></i>
            {item.title}
          </span>
          <div className="toggle-btn"></div>
        </div>
        
        <div className="sidebar-content">
          {item.childrens.map((child, index) => (
            hasAccess(child) && (
              <Link
                key={index}
                to={child.path}
                className={`sidebar-item plain ${isActive(child.path) ? 'active' : ''}`}
              >
                {child.icon && <i className={child.icon}></i>}
                {child.title}
              </Link>
            )
          ))}
        </div>
      </div>
    );
  }

  // Single item (no children)
  return (
    <div className="sidebar-item">
      <Link 
        to={item.path} 
        className={`sidebar-title ${isActive(item.path) ? 'active' : ''}`}
      >
        <span>
          <i className={item.icon}></i>
          {item.title}
        </span>
      </Link>
    </div>
  );
}
