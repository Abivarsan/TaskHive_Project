import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProtectedRoute from './Auth/ProtectedRoute';
import { AuthProvider } from './Auth/AuthContext';
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ProjectCreation from "./Pages/Project/Project-Manager/ProjectCreation";
import ProjectList from "./Pages/Project/ProjectList";
import TaskCreation from "./Pages/Project/TaskCreation";
// import ClientList from "./Pages-Hemal/ClientList";
// import Payments from "./Pages-Hemal/Payments";
 import Budgetplan from "./Pages/Finance/Budgetplan";
// import SendEmail from "./Pages-Hemal/SendEmail";
import AdminProjectViewPage from "./Pages/Admin/AdminPojectViewPage";
import AddDevelopersPage from "./Pages/Project/AddDevelopersPage";
// import BudgetEstimationForm from "./Pages-Chamara/BudgetEstimationForm";
import DashboardDeveloper from "./Pages/Developer/DashboardDeveloper";
import ProjectDeveloper from "./Pages/Developer/ProjectDeveloper";
import TaskDeveloper from "./Pages/Developer/TaskDeveloper";
import ProgressDeveloper from "./Pages/Developer/ProgressDeveloper";
import ProjectDescriptionDeveloper from "./Pages/Developer/ProjectDescriptionDeveloper";
import TaskDescriptionDeveloper from "./Pages/Developer/TaskDescriptionDeveloper";
import TaskRecord from "./Pages/Developer/TaskRecord";
import ProjectReport from "./Pages/Developer/ProjectReport";
import ProjectModuleReport from "./Pages/Developer/ProjectModuleReport";
import TeamDescriptionDeveloper from "./Pages/Developer/TeamDescriptionDeveloper";
import ProjectFileViewPage from "./Pages/Developer/ProjectFileViewPage";
import BudgetEditPage from "./Pages/Finance/BudgetEditPage";
import UserManagement from "./Pages/Admin/UserManagement";
import UserCreation from "./Pages/Admin/UserCreation";
import ViewUserList from "./Pages/Admin/ViewUserList";
import LoginForm from "./Pages/Admin/LoginForm";
import ResetPassword from "./Pages/Admin/ResetPassword";
import ForgotPassword from "./Pages/Admin/ForgotPassword";
import TransactionPage from "./Pages/Finance/TransactionPage";
import ViewUserDetail from "./Pages/Admin/ViewUserDetail";
import TaskList from "./Pages/Project/TaskList";
import TaskDetailsPage from "./Pages/Project/TaskDetailsPage";
import ProjectManagerDashboard from "./Pages/Project/ProjectManagerDashboard";
import PMprojectListPage from "./Pages/Project/Project-Manager/PMprojectListPage";
import PMprojectDetailsPage from "./Pages/Project/Project-Manager/PMprojectDetailsPage";
import PMtaskCreationPage from "./Pages/Project/Project-Manager/PMtaskCreationPage";
import PMtaskListPage from "./Pages/Project/Project-Manager/PMtaskListPage";
import PMaddDevelopersPage from "./Pages/Project/Project-Manager/PMaddDevelopersPage";
import PMtaskDetailsPage from "./Pages/Project/Project-Manager/PMtaskDetailsPage";
import FinanceDigram from "./Pages/Finance/FinanceDigram";
import Payment from "./Pages/Finance/Payment";
import ClientCreation from "./Pages/Client/ClientCreation";
import ViewClientDetail from "./Pages/Client/ViewClientDetail";
import ViewClientList from "./Pages/Client/ViewClientList";
import FullTaskListPage from "./Pages/Project/FullTaskListPage";
import PMFullTaskViewPage from "./Pages/Project/Project-Manager/PMFullTaskViewPage";
import UpdateProjectPage from "./Pages/Project/UpdateProjectPage";
import UpdateTaskPage from "./Pages/Project/UpdateTaskPage";
import EditProfile from "./Pages/Admin/EditProfile";
import PMUserListPage from "./Pages/Project/Project-Manager/PMuserListpage";





function App() {
  return (
    <div className="main">
       <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/resetpassword" element={<ResetPassword/>}/>
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/editProfile/:userId" element={<EditProfile />} />

        <Route element={<ProtectedRoute allowedRoles={['1']} />}>
              <Route path="/adminDashboard" element={<AdminDashboard />} />
              <Route path="/userCreation" element={<UserCreation/>}/>
              <Route path="/budget" element ={<Budgetplan/>}/>
              <Route path="/transaction" element ={<TransactionPage/>}/>
              <Route path="/clientCreation" element={<ClientCreation/>}/>
              <Route path="/clientList" element={<ViewClientList/>}/>
              <Route path="/clientProfilePage/:clientId" element={<ViewClientDetail/>}/>
              <Route path="/userManagement" element={<UserManagement/>} />
              <Route path="/userProfilePage/:userId" element={<ViewUserDetail />} />

              
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['1', '2']} />}>
              <Route path="/userList" element={<ViewUserList />} />             
              <Route path="/financedigram" element={<FinanceDigram/>}/>
              <Route path="/taskList" element={<TaskList/>}></Route>
              <Route path="/taskDetailsPage" element={<TaskDetailsPage/>}/>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['2']} />}>
              <Route path="/ProjectManagerDashboard" element={<ProjectManagerDashboard/>}/>
               <Route path="/PMuserListPage" element={<PMUserListPage/>}/>
               
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['3']} />}>
              <Route path="/DeveloperDashboard" element={<DashboardDeveloper/>}></Route>
              <Route path="/DeveloperPayment" element={<Payment/>}></Route>
        </Route>
        
    
        <Route path="/projectcreation" element ={<ProjectCreation/>}></Route>
        <Route path="/projectlist" element ={<ProjectList/>}></Route>
        <Route path="/AdminProjectViewPage" element={<AdminProjectViewPage/>}></Route>
        
        <Route path="/taskcreation" element ={<TaskCreation/>}></Route>
        {/* <Route path="/clientlist" element ={<ClientList/>}></Route>
        <Route path="/payments" element ={<Payments/>}></Route>
        <Route path="/sendemail" element ={<SendEmail/>}></Route>*/}
 
 
       
        <Route path="/AddDevelopersPage" element={<AddDevelopersPage/>}></Route>
        <Route path="/AddDevelopersPage" element={<AddDevelopersPage/>}></Route>
        <Route path="/AdminProjectViewPage" element={<AdminProjectViewPage/>}></Route>
         <Route path="/updateProjectPage" element={<UpdateProjectPage/>}></Route>

        <Route path="/loginform" element={<LoginForm/>}></Route>
        <Route path="/resetpassword" element={<ResetPassword/>}></Route>         
        <Route path="/userprofilepage/:userId" element={<ViewUserDetail/>}></Route>

        {/* <Route path="/budgetestform"  element={<BudgetEstimationForm/>}></Route> */}

       {/* newly added routes  */}
         {/* Developer  */}
            <Route path="/DeveloperDashboard" element={<DashboardDeveloper/>}></Route>
            <Route path="/TeamDescriptionDeveloper" element={<TeamDescriptionDeveloper/>}></Route>

            <Route path="/DeveloperProject" element={<ProjectDeveloper/>}></Route>
            <Route path="/ProjectDescriptionDeveloper" element={<ProjectDescriptionDeveloper/>}></Route>
            <Route path="/ProjectFileViewPage" element={<ProjectFileViewPage/>}></Route>
            <Route path="/ProjectReport" element={<ProjectReport/>}></Route>
             <Route path="/ProjectModuleReport" element={<ProjectModuleReport/>}></Route>

            <Route path="/DeveloperTask" element={<TaskDeveloper/>}></Route>
            <Route path="/TaskDescriptionDeveloper" element={<TaskDescriptionDeveloper/>}></Route>
            <Route path="/TaskRecord" element={<TaskRecord/>}></Route>
            <Route path="/DeveloperProgress" element={<ProgressDeveloper/>}></Route>
        
       
           
       
       
       
     
        <Route path="/PMprojectListPage" element={<PMprojectListPage/>}></Route>
        <Route path="/PMprojectDetailsPage" element={<PMprojectDetailsPage/>}></Route>
        <Route path="/PMtaskCreationPage" element={<PMtaskCreationPage/>}></Route>
        <Route path="/PMtaskListPage" element= {<PMtaskListPage />}></Route>
        <Route path="/PMaddDevelopersPage" element = {<PMaddDevelopersPage />}></Route>
        <Route path="PMtaskDetailsPage" element = {<PMtaskDetailsPage />}></Route>
        <Route path="/taskList" element={<TaskList/>}></Route>
        <Route path="/fullTaskListPage" element = {<FullTaskListPage/>}></Route>
        <Route path="/pMFullTaskListPage" element = {<PMFullTaskViewPage/>}></Route>
         
          <Route path="/updateTaskPage" element={<UpdateTaskPage/>}></Route>
          <Route path="/budgetcreation" element={<BudgetEditPage/>}></Route>

      </Routes>
      
      </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
