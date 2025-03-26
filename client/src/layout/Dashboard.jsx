import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <section className='bg-gradient-to-br from-gray-50 to-white min-h-screen'>
      <div className='flex'>
        {/* left part - UserMenu */}
        <div className='lg:block hidden w-[280px] h-screen bg-white shadow-lg border-r border-gray-100 fixed left-0 top-0 pt-20 transition-all duration-300 ease-in-out hover:shadow-xl'>
          <div className='h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent'>
            <UserMenu />
          </div>
        </div>

        {/* right part - Outlet */}
        <div className='flex-1 lg:ml-[280px] ml-0'>
          <div className='container mx-auto lg:px-8 px-4 p-8'>
            <div className='bg-white rounded-xl shadow-sm lg:p-6 p-2 transition-all duration-300 hover:shadow-md'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
