import React from 'react';
import * as faicons from "react-icons/fa";
import * as ioicons from "react-icons/io";
import * as cgicons from "react-icons/cg";

export const Sidebardata=[

{
    title:'profile',
    path:'/profile',
    icon:<cgicons.CgProfile/>,
    cName:'nav-text'
},
{
    title:'Home',
    path:'/',
    icon:<faicons.FaHome />,
    cName:'nav-text'
},

{
    title:'support',
    path:'/',
    icon:<ioicons.IoMdHelpCircle/>,
    cName:'nav-text'
},

{
    title:'about',
    path:'/',
    icon:<faicons.FaHandsHelping/>,
    cName:'nav-text'
},

{
    title:'Logout',
    path:'/Logout',
    icon:<faicons.FaSignOutAlt/>,
    cName:'nav-text'
},

]