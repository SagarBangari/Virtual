import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import Widget from './components/Widget.jsx'
import Register from './pages/Register.jsx'
import { Outlet } from 'react-router-dom' 
import ThemeModal from './ThemeModal.jsx'
import { useSelector } from 'react-redux'

const RouteLayout = () => {
  const {themeModalIsOpen} = useSelector(state=>state?.ui)
  const {primaryColor,backgroundColor} = useSelector(state=>state?.ui?.theme)

  useEffect(()=>{
    const body = document.body;
    body.className =`${primaryColor} ${backgroundColor}`
  },[primaryColor,backgroundColor])

  return (
    <>
    <Navbar/>
    <main className='main'>
        <div className="container main__container">
            <Sidebar/>
            <Outlet/>
            <Widget/>
            {themeModalIsOpen && <ThemeModal/>}
        </div>
    </main>
    </>
  )
}

export default RouteLayout