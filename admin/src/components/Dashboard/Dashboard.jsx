import React, { useEffect, useState, useContext } from 'react'
import './Dasboard.css'
import { BsArchive, BsPeople, BsCashCoin } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AreaChart, Area } from 'recharts';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

const Dashboard = () => {
    const [change, setChange] = useState(false)
    const { customer, setCustomer, revenue, setRevenue, url, list, setList, orders, setOrders } = useContext(StoreContext)
    const [mon, setMon] = useState(0);
    const [tue, setTue] = useState(0);
    const [wed, setWed] = useState(0);
    const [thu, setThu] = useState(0);
    const [fri, setFri] = useState(0);
    const [sat, setSat] = useState(0);
    const [sun, setSun] = useState(0);


    const getDailyRevenue = () => {
        let tempMon = 0;
        let tempTue = 0;
        let tempWed = 0;
        let tempThu = 0;
        let tempFri = 0;
        let tempSat = 0;
        let tempSun = 0;

        for (let i = 0; i < orders.length; i++) {
            const date = new Date(orders[i].date).toLocaleDateString('en-US', { weekday: 'long' });
            switch (date) {
                case 'Monday':
                    tempMon += orders[i].amount;
                    break;
                case 'Tuesday':
                    tempTue += orders[i].amount;
                    break;
                case 'Wednesday':
                    tempWed += orders[i].amount;
                    break;
                case 'Thursday':
                    tempThu += orders[i].amount;
                    break;
                case 'Friday':
                    tempFri += orders[i].amount;
                    break;
                case 'Saturday':
                    tempSat += orders[i].amount;
                    break;
                case 'Sunday':
                    tempSun += orders[i].amount;
                    break;
            }
        }

        setMon(tempMon);
        setTue(tempTue);
        setWed(tempWed);
        setThu(tempThu);
        setFri(tempFri);
        setSat(tempSat);
        setSun(tempSun);
    }
   
  
    // fetching customers
    const fetchCustomers = async () => {
        const response = await axios.get(`${url}api/user/customers`)
        if (response.data.success) {
            setCustomer(response.data.users);

        }
        else {
            setCustomer(0);
        }
    }
    useEffect(() => {
        fetchCustomers();
        getDailyRevenue();
    }, [customer])
    const data = [
        { name: 'MON', Revenue: mon },
        { name: 'TUE', Revenue: tue },
        { name: 'WED', Revenue: wed },
        { name: 'THU', Revenue: thu },
        { name: 'FRI', Revenue: fri },
        { name: 'SAT', Revenue: sat },
        { name: 'SUN', Revenue: sun },
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
                    <p>{orders.length}</p>
                </div>
                <div className="card card-cash">
                    <h3>Revenue</h3>
                    <BsCashCoin className='icon' style={{ fontSize: '2em' }} />
                    <p>${revenue}</p>
                </div>
                <div className="card card-users">
                    <h3>Customers</h3>
                    <BsPeople className='icon' style={{ fontSize: '2em' }} />
                    <p>{customer}</p>
                </div>
                <div className="card card-products">
                    <h3>Products</h3>
                    <BsArchive className='icon' style={{ fontSize: '2em' }} />
                    <p>{list.length}</p>
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
                        <BarChart width={window.innerWidth < 768 ? 350 : 730} height={window.innerWidth < 768 ? 200 : 250} data={data}>
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
                        <AreaChart width={window.innerWidth < 768 ? 300 : 730} height={window.innerWidth < 768 ? 180 : 250} data={data}
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