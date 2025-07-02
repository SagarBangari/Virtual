import React from 'react'
import RouteLayout from './RouteLayout'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './store/store'


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