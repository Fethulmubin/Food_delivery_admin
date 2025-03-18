import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { LuLayoutDashboard } from "react-icons/lu";
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar' >
        <div className="sidebar-options">
            <NavLink to='/' className="sidebar-option">
                <LuLayoutDashboard style={{ fontSize: '2em' }}/>
                <p>Dashboard</p>
            </NavLink>
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink>
        </div>

    </div>
  )
}

export default Sidebar