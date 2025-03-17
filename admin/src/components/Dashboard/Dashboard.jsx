import React from 'react'
import './Dasboard.css'
// import {BsFillArchiveFill, BsPeople, FaRegBell,BsCashCoin} from 'react-icons'
import { BsArchive, BsPeople, BsCashCoin } from "react-icons/bs";
// import { IoPeopleOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AreaChart, Area } from 'recharts';
// import { BsCashCoin } from "react-icons/bs";

const Dashboard = () => {
    const [change, setChange] = React.useState(false)
    const data = [
        { name: 'MON', Revenue: 2400, amt: 2400 },
        { name: 'TUE', Revenue: 1398, amt: 2210 },
        { name: 'WED', Revenue: 9800, amt: 2290 },
        { name: 'THU', Revenue: 3908, amt: 2000 },
        { name: 'FRI', Revenue: 4800, amt: 2181 },
        { name: 'SAT', Revenue: 3800, amt: 2500 },
        { name: 'SUN', Revenue: 4300, amt: 2100 },
    ];
    return (
        <div>
            <div className="container-dashboard">
                <h1>Dashboard</h1>
            </div>
            <div className="main-cards">
                <div className="card card-order">
                    <h3>Orders</h3>
                    <FaRegBell className='icon' style={{ fontSize: '2em' }} />
                    <p>20</p>
                </div>
                <div className="card card-cash">
                    <h3>Revenue</h3>
                    <BsCashCoin className='icon' style={{ fontSize: '2em' }} />
                    <p>$2000</p>
                </div>
                <div className="card card-users">
                    <h3>Users</h3>
                    <BsPeople className='icon' style={{ fontSize: '2em' }} />
                    <p>100</p>
                </div>
                <div className="card card-products">
                    <h3>Products</h3>
                    <BsArchive className='icon' style={{ fontSize: '2em' }} />
                    <p>50</p>
                </div>
            </div>
            <div className='chart-conatiner'>
            <div className="toggle-container">
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={change}
                        onChange={() => setChange(!change)}
                    />
                    <span className="slider"></span>
                </label>
                <p>{change ? 'Bar' : 'Area'}</p>
            </div>
            {change ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <BarChart width={730} height={250} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Revenue" fill="#57BEBA" />
                    </BarChart>
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <AreaChart width={730} height={250} data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="Revenue" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </div>
            )}
            </div>
        </div>
    )
}

export default Dashboard