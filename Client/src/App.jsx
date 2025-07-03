import React from 'react'
import RouteLayout from './RouteLayout.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store/store.js'
import './index.css';
import Bookmarks from './pages/Bookmarks.jsx'
import Errorpage from './pages/Errorpage.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Logout from './pages/Logout.jsx'
import Messages from './pages/Messages.jsx'
import Profile from './pages/Profile.jsx'
import Register from './pages/Register.jsx'
import SinglePost from './pages/Singlepost.jsx'
import MessageList from './components/MessageList.jsx'
import Navabar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Widget from './components/Widget'

const router = createBrowserRouter([
  {path :'/', element:<RouteLayout/> ,errorElement:<Errorpage/>,children :[
    {index:true, element :<Home/>},
    {path : "messages", element : <MessageList/>},
    {path : "messages/:receiverId", element : <Messages/>},
    {path : "bookmarks", element : <Bookmarks/>},
    {path : "users/:id", element : <Profile/>},
    {path : "posts/:id", element : <SinglePost/>},
  ]},
   {path : "/login", element : <Login/>},
    {path : "/register", element : <Register/>},
    {path : "/logout", element : <Logout/>},
])

const App = () => { 
   return (
   <Provider store={store}><RouterProvider router = {router} /></Provider> 
  )
}

export default App;