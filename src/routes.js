import { Navigate, Route, Routes, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Task from './pages/Task';
import NewTask from './pages/NewTask';
import Workflow from './pages/Workflow';

import RequireAuth from './sections/auth/RequireAuth';
import Page401 from './pages/Page401';

const ROLES_LIST = {
  "Admin": 2000,
  "DI": 2001,
  "CE": 2002,
  "DIE": 2003,
  "ME": 2004,
  "IE": 2005,
  "EA": 2006,
  "DmanDIE": 2007,
  "DmanDI": 2008
}

// ----------------------------------------------------------------------

export default function Router() {
  return (
    <Routes >

      <Route path="/" element={<LogoOnlyLayout />}>
        <Route path="/" element={<Navigate to="/dashboard/app" />} />
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

        <Route path="products" element={<Products />} />
        {/* <Route path="blog" element={<Blog />} /> */}
        <Route path="workflow" element={<Workflow />} />
        <Route path='task' element={<Task />}/>
        <Route path="task/new" element={<NewTask />} />
      </Route>
      

      <Route path='/unauth' element={<Page401 />} />
      <Route path='*' element={<Navigate to="/404" />}/>
    </Routes>
  );
  // return useRoutes([
  //   {
  //     path: '/dashboard',
  //     element: <DashboardLayout />,
  //     children: [
  //       { path: 'app', element: <DashboardApp /> },
  //       {
  //         path: 'user',
  //         element: <RequireAuth allowedRoles={[ROLES_LIST.user]} />,
  //         // children: <User />
  //         children: {path: '/', element: <User />}
  //       },
  //       { path: 'products', element: <Products /> },
  //       { path: 'blog', element: <Blog /> },
  //     ],
  //   },
  //   {
  //     path: '/',
  //     element: <LogoOnlyLayout />,
  //     children: [
  //       { path: '/', element: <Navigate to="/dashboard/app" /> },
  //       { path: 'login', element: <Login /> },
  //       { path: 'register', element: <Register /> },
  //       { path: '404', element: <NotFound /> },
  //       { path: '*', element: <Navigate to="/404" /> },
  //     ],
  //   },
  //   { path: '*', element: <Navigate to="/404" replace /> },
  // ]);
}
