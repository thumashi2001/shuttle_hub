import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import "./NavBar.css";
import { IconContext } from 'react-icons';


function Navbar({ handleLogout }) {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const showSidebar = () => setSidebar(!sidebar);

  const handleClick = (path) => {
    if (path === '/logout') {
      handleLogout();
      navigate('/login');
    }
  };

  const sidebarData = SidebarData(); 

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='Navbar'>
          <Link to="#" className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
      
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}> 
          <ul className='nav-menu-items' onClick={showSidebar} >
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose  />
              </Link>
            </li>
            {sidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} onClick={() => handleClick(item.path)}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
