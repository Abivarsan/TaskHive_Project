import React from 'react'
import Topbar from '../../Components/Common-Components/Topbar';
import DeveloperSidebar from '../../Components/Developer-Components/DeveloperSidebar';

import TeamDescription from '../../Components/Developer-Components/TeamDescription';

export default function TeamDescriptionDeveloper() {
  return (<div>
    <div className='DeveloperTeam'>
    
      <Topbar />
      <DeveloperSidebar/>

      <div className="Content">


          
            <TeamDescription/>

        </div>
    
    </div>
    </div>
  )
}
