import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {CiSearch} from 'react-icons/ci'
import User from '../../../Server/models/userModel'
import ProfileImage from './ProfileImage.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const userId = useSelector(state=>state?.user?.currentUser?.id);
    const token = useSelector(state=>state?.user?.currentUser?.token);
    const profilePhoto = useSelector(state=>state?.user?.currentUser?.profilePhoto);

    const   navigate = useNavigate()

    useEffect(()=>{
        if(!token){
            navigate('/login')
        }
    },[])

    useEffect(()=>{
        setTimeout(()=>{
            navigate('/logout')
        },1000 * 60 * 60)
    })

  return (
    <nav className='navbar'>
        <div className="container navbar__container">
            <Link to='/' className='navbar__logo'>Sagar</Link>
            <form className='navbar__search'>
                <input type="search" placeholder='Search' />
                <button type='submit'> <CiSearch/></button>
            </form>
            <div className="navbar__right">
                <Link to ={`/users/${userId}`} className='navbar__profile'>
                                <ProfileImage image = {profilePhoto}/>
                </Link>
                {token ? <Link to ="/logout">Logout</Link>:<Link to="/login">Login</Link>}
            </div>
        </div>
    </nav>
  )
}

export default Navbar