import React,{ useEffect, useContext} from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'  
import Order from './pages/Order/Order'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Dashboard from './components/Dashboard/Dashboard'
import { toast } from 'react-toastify'
import { StoreContext } from './context/StoreContext'
import axios from 'axios'
const App = () => {

    const { url, orders, setOrders, revenue, setRevenue , list, setList} = useContext(StoreContext)
  
    //fetching all orders
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get(`${url}api/order/list`)
        // console.log(response)
        if (response.data.success) {
          setOrders(response.data.orders)
          // console.log(orders)
        } else {
          toast.error('Error fetching orders')
        }
      } catch (err) {
        toast.error('Network error')
        console.error(err)
      }
    }
    const revenueHandler = async () =>{
      const totalRevenue =  orders.reduce((acc, order) => {
        return acc + order.amount
      }, 0)
      setRevenue(totalRevenue)
    }
    //
      const fetchList =  async ()=>{
        const response = await axios.get(`${url}api/food/list`);
        console.log(response.data.foods)
        if(response.data.success){
            setList(response.data.foods);
        }
        else{
          toast.error('Error')
        }
      }
     useEffect(() => {
        if (orders.length === 0) {
          fetchAllOrders()
        }
        if(list.length === 0){
          fetchList();
          }
          revenueHandler()
      }, [orders, list])
  return (
    <div>
      <ToastContainer />
      <Navbar/>
      <hr />
    <div className="app-content">
      <Sidebar/>
      <Routes>
        <Route path="/add" element={<Add />} />
        <Route path="/list" element={<List />} />
        <Route path="/orders" element={<Order />} />
        <Route path='/' element={<Dashboard/>}/>
      </Routes>
    </div>
    </div>
  )

}
export default App