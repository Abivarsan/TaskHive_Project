import Topbar from '../../../Components/Common-Components/Topbar'
import ProjectManagerSidebar from '../../../Components/Project-Components/ProjectManagerSidebar'
import PMUserList from '../../../Components/Project-Components/Project-Manger-Components/PMuserListCom'

export default function PMUserListPage() {
  return (
    <div>
        <div className="FullPage">
        
        <Topbar />
        <ProjectManagerSidebar />
        <div className="Content">  
            <div>
              {/* content */}
              <PMUserList />
             
            </div>
            
        </div>
        
      </div>
      
    </div>
  )
}
