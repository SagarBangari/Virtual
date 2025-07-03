import React from 'react'
import {AiOutlineHome} from 'react-icons/ai'
import {GoMail} from 'react-icons/go'
import {FaRegBookmark} from 'react-icons/fa'
import {PiPaintBrushBold} from 'react-icons/pi'
import {useDispatch} from 'react-redux'
import uiSlice, {uiActions} from '../store/ui-slice'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  
  const dispatch = useDispatch()

  const openThemeModal = ()=>{
    dispatch(uiActions.openThemeModal())
  }

  return (
    <menu className="sidebar">
      <NavLink to="/" className={`sidebar__item ${({isActive})=>{isActive ? "active" : ""}}`}>
        <i className='sidebar__icon'><AiOutlineHome/></i>
        <p>Home</p>
      </NavLink>

      <NavLink to="/messages" className={`sidebar__item ${({isActive})=>{isActive ? "active" : ""}}`}>
        <i className='sidebar__icon'><GoMail/></i>
        <p>Messages</p>
      </NavLink>

      <NavLink to="/bookmarks" className={`sidebar__item ${({isActive})=>{isActive ? "active" : ""}}`}>
        <i className='sidebar__icon'><FaRegBookmark/></i>
        <p>Bookmarks</p>
      </NavLink>

       <div className={`sidebar__item ${({isActive})=>isActive ? "active" : ""}`} onClick ={openThemeModal}>
        <i className='sidebar__icon'><PiPaintBrushBold/></i>
        <p>Themes</p>
        </div>
    </menu>
  )
}

export default Sidebar