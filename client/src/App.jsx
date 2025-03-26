import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'
import { fetchUserDetail } from "./utils/fetchUserDetail";
import BackToTopButton from './components/BackToTopButtom'
import { useLocation } from 'react-router-dom'
const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const fetchUser = async () => { 
    const userDetail = await fetchUserDetail();
    dispatch(setUserDetails(userDetail.data));
  }
  const isSearch = location.pathname === "/search";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-hidden">
      <Header />
      <main className={`flex-grow min-h-[calc(100vh-10rem)] lg:mt-0 ${isSearch ? 'mt-0' : 'mt-10'} transition-all duration-300 pt-16`}>
        <Outlet />
      </main>
      
      <Footer />
      <BackToTopButton/>
      <Toaster/>
    </div>
  )
}

export default App
