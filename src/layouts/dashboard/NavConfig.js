// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => < Iconify icon = { name }
width = { 22 }
height = { 22 }
/>;

const navConfig = [{
        title: 'dashboard',
        path: '/dashboard/app',
        icon: getIcon('eva:pie-chart-2-fill'),
    },
    {
        title: 'task',
        path: "/dashboard/task" ,
        icon: getIcon('eva:file-text-fill'),
    },
    {
        title: 'user',
        path: '/dashboard/user',
        icon: getIcon('eva:people-fill'),
    },
    // {
    //     title: 'product',
    //     path: '/dashboard/products',
    //     icon: getIcon('eva:shopping-bag-fill'),
    // },
    // {
    //     title: 'login',
    //     path: '/login',
    //     icon: getIcon('eva:lock-fill'),
    // },
    // {
    //     title: 'register',
    //     path: '/register',
    //     icon: getIcon('eva:person-add-fill'),
    // },
    // {
    //     title: 'Not found',
    //     path: '/404',
    //     icon: getIcon('eva:alert-triangle-fill'),
    // },
    // {
    //     title: 'SubTask',
    //     path: '/dashboard/subtask/6331ac366dab4342dee411c7',
    //     icon: getIcon('eva:alert-triangle-fill'),
    // },
  
    // {
    //     title: 'login',
    //     path: '/login',
    //     icon: getIcon('eva:lock-fill'),
    // },
    // {
    //     title: 'register',
    //     path: '/register',
    //     icon: getIcon('eva:person-add-fill'),
    // },
 
    // {
    //     title: 'FileStore',
    //     path: '/dashboard/store',
    //     icon: getIcon('eva:alert-triangle-fill'),
    // },
];

export default navConfig;