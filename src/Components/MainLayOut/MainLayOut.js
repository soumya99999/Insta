import React from 'react';
import useMediaQuery from '../MediaQuery/MediaQuery';
import MobileNavbar from '../Navbar/MobileNavbar';
import Navbar from '../Navbar/Navbar';
import './MainLayOut.css';
import { Outlet } from 'react-router-dom';

const MainLayOut = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <div className={`main-layout ${isMobile ? 'mobile' : 'desktop'}`}>
      {isMobile ? (
        <div >
          <MobileNavbar />
          <div className="outlet">
            <Outlet />
          </div>
        </div>
      ) : (
        <div >
          <Navbar />
          <div className="outlet">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}


export default MainLayOut;