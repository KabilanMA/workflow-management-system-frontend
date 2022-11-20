import { Navigate, Route, Routes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import FileStore from './pages/FileStore';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Task from './pages/Task';
import NewTask from './pages/NewTask';
import Workflow from './pages/Workflow';
import Profile from './pages/Profile';

import SubtaskDes from './pages/SubtaskDes';

import RequireAuth from './sections/auth/RequireAuth';
import LoginAuth from './sections/auth/LoginAuth';
import Page401 from './pages/Page401';
import WorkArea from './pages/WorkArea';

const ROLES_LIST = {
  Admin: 2000,
  DI: 2001,
  CE: 2002,
  DIE: 2003,
  ME: 2004,
  IE: 2005,
  EA: 2006,
  DmanDIE: 2007,
  DmanDI: 2008,
};

// ----------------------------------------------------------------------

export default function Router() {
  return (

    <Routes >

      <Route path='/' element={<LoginAuth />}>
        <Route path='/' element={<Navigate to="/dashboard/app" />} />
        <Route path='dashboard' element={<DashboardLayout />} >

          <Route path='app' element={<DashboardApp />}/>

          <Route path='task/new' element={<RequireAuth allowedRoles={[ROLES_LIST.DI, ROLES_LIST.Admin]} />}>
            <Route path='/dashboard/task/new' element={<NewTask />} />
          </Route>

          <Route path='user' element={<RequireAuth allowedRoles={[ROLES_LIST.DI, ROLES_LIST.Admin]} />}>
            <Route path='/dashboard/user' element={<User />} />
          </Route>

          <Route path='/dashboard/task' element={<Task />} />
          <Route path="workflow" element={<Workflow />} />
          <Route path='profile' element={<Profile />}/>
          

        </Route>
      </Route>

      <Route path="/" element={<LogoOnlyLayout />}>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="404" element={<NotFound />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="app" element={<DashboardApp />} />

        {/* Role based authorization example */}
        <Route path='user' element={<RequireAuth allowedRoles={[ROLES_LIST.DI, ROLES_LIST.Admin]} />}>
          <Route path="/dashboard/user" element={<User />} />
        </Route>

       

        <Route path='workflow' element={<RequireAuth allowedRoles={[ROLES_LIST.DI, ROLES_LIST.Admin, ROLES_LIST.CE, ROLES_LIST.DI, ROLES_LIST.DIE, ROLES_LIST.DmanDI, ROLES_LIST.DmanDIE, ROLES_LIST.EA, ROLES_LIST.IE, ROLES_LIST.ME]} />}>
        {/* <Route path="subtask/:id" element={<SubtaskDes/>} /> */}
        </Route>
        <Route path="subtask" element={<RequireAuth allowedRoles={[ROLES_LIST.DI, ROLES_LIST.Admin, ROLES_LIST.CE, ROLES_LIST.DI, ROLES_LIST.DIE, ROLES_LIST.DmanDI, ROLES_LIST.DmanDIE, ROLES_LIST.EA, ROLES_LIST.IE, ROLES_LIST.ME]} />}>
          <Route path="/dashboard/subtask" element={<SubtaskDes />}  />
        </Route>

        <Route path="WorkArea" element={<RequireAuth allowedRoles={[ROLES_LIST.DI, ROLES_LIST.Admin, ROLES_LIST.CE, ROLES_LIST.DI, ROLES_LIST.DIE, ROLES_LIST.DmanDI, ROLES_LIST.DmanDIE, ROLES_LIST.EA, ROLES_LIST.IE, ROLES_LIST.ME]} />}>
          <Route path="/dashboard/WorkArea" element={<WorkArea />}  />
        </Route>


        <Route path="task" element={<RequireAuth allowedRoles={[ROLES_LIST.DI, ROLES_LIST.Admin, ROLES_LIST.CE, ROLES_LIST.DI, ROLES_LIST.DIE, ROLES_LIST.DmanDI, ROLES_LIST.DmanDIE, ROLES_LIST.EA, ROLES_LIST.IE, ROLES_LIST.ME]} />}>
          <Route path="/dashboard/task" element={<Task />}  />
        </Route>


        <Route path="store" element={<RequireAuth allowedRoles={[ROLES_LIST.DI, ROLES_LIST.Admin, ROLES_LIST.CE, ROLES_LIST.DI, ROLES_LIST.DIE, ROLES_LIST.DmanDI, ROLES_LIST.DmanDIE, ROLES_LIST.EA, ROLES_LIST.IE, ROLES_LIST.ME]} />}>
          <Route path="/dashboard/store" element={<FileStore />}  />
        </Route>
        
        <Route path="task" element={<RequireAuth allowedRoles={[ROLES_LIST.DI, ROLES_LIST.Admin, ROLES_LIST.CE, ROLES_LIST.DI, ROLES_LIST.DIE, ROLES_LIST.DmanDI, ROLES_LIST.DmanDIE, ROLES_LIST.EA, ROLES_LIST.IE, ROLES_LIST.ME]} />}>
          <Route path="/dashboard/task" element={<Task />}  />
        </Route>


        <Route path='task/new' element={<RequireAuth allowedRoles={[ROLES_LIST.DI, ROLES_LIST.Admin]} />}>
          <Route path="/dashboard/task/new" element={<NewTask />} />
        </Route>

      </Route>
      
      <Route path='/unauth' element={<Page401 />} />
      <Route path='*' element={<Navigate to="/404" />}/>
    </Routes>
  );
}
