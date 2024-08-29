import React from 'react'
import { Outlet } from 'react-router-dom'
import Feed from '../Feed/Feed'
import RightSidebar from '../Navbar/RightSidebar'
import useGetSuggestedUsers from '../../Hooks/useGetSuggestedUsers'

function Home() {
  useGetSuggestedUsers();
  return (
    <div className='flex'>
            <div className='flex-grow'>
                <Feed />
                <Outlet />
            </div>
            <RightSidebar />
        </div>
)
}

export default Home