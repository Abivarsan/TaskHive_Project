import React from "react";
import Topbar from "../../../Components/Common-Components/Topbar";
import ProjectManagerSidebar from "../../../Components/Project-Components/ProjectManagerSidebar";
import PMtaskListCom from "../../../Components/Project-Components/Project-Manger-Components/PMtaskListCom";

export default function PMtaskListPage() {
  return (
    <div>
      <div className="FullPage">
        <Topbar />
        <ProjectManagerSidebar />
        <div className="Content">
          <h2>Task List</h2>

          <div>
            {/* content */}

            <PMtaskListCom />
          </div>
        </div>
      </div>
    </div>
  );
}
