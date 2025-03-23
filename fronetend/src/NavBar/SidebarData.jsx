import React, { useContext } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { AuthContext } from '../Context/AuthContext';

export const SidebarData = () => {
  const { user } = useContext(AuthContext);

  if (!user) return []; 

  
  if (user.role === 'admin') {
    return [
      {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text",
      },
      {
        title: "Add Employee",
        path: "/user/AddUser",
        icon: <FaIcons.FaRegUser />,
        cName: "nav-text",
      },
      {
        title: "Display Employee",
        path: "/user/UserDetails",
        icon: <FaIcons.FaRegFileAlt />,
        cName: "nav-text",
      },
      {
        title: "Calculate OT",
        path: "/user/CalculateOT",
        icon: <FaIcons.FaCommentDollar />,
        cName: "nav-text",
      },
      {
        title: "Logout",
        path: "/logout",
        icon: <AiIcons.AiOutlineLogout />,
        cName: "nav-text",
      },
    ];
  }

  
  if (user.role === 'employee') {
    return [
      {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text",
      },
      {
        title: "Contact Admin",
        path: "/user/ContactAdmin",
        icon: <FaIcons.FaEnvelope />,
        cName: "nav-text",
      },
      {
        title: "Logout",
        path: "/logout",
        icon: <AiIcons.AiOutlineLogout />,
        cName: "nav-text",
      },
    ];
  }

  return [];
};
