import React from 'react'

const RouteLayout = () => {
  return (
    <>
    <Navbar/>
    <main className='main'>
        <div className="container main__container">
            <Sidebar/>
            <Outlet/>
            <Widgets/>
        </div>
    </main>
    </>
  )
}

export default RouteLayout