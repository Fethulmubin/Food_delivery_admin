import React, { useContext, useEffect } from 'react'
import './Order.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../../../../Food_delivery/src/assets/assets/frontend_assets/assets'

const Order = () => {
  const { url, orders, setOrders } = useContext(StoreContext)

  //fetching all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}api/order/list`)
      console.log(response)
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error('Error fetching orders')
      }
    } catch (err) {
      toast.error('Network error')
      console.error(err)
    }
  }
  //changing status
  const statusHandler = async (e, orderId) =>{
    const response = await axios.post(`${url}api/order/status`, {
      orderId,
      status: e.target.value
    })
    if(response.data.success){
     await fetchAllOrders()
    }

  }

  useEffect(() => {
    if (orders.length === 0) {
      fetchAllOrders()
    }
  }, [orders])

  return (
    <div className='order-list'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div className='order-item' key={index}>
            <img src={assets.parcel_icon} alt="parcel" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx !== order.items.length - 1 && ', '}
                  </span>
                ))}
              </p>
              <p className='order-item-name'>
                {`${order.address.firstName} ${order.address.lastName}`}
              </p>
              <div className="order-item-address">
                <p>{order.address.street+ " , "}</p>
                <p>{order.address.city+" , "+
                order.address.state+" , "+
                order.address.country+" , " +
                order.address.zipcode} </p>
              </div>
              <p className='order-item-phone'> {order.address.phone}</p>
              {order.payment ? <p className='paid'>Paid</p>:
                 <p className='not-paid'>Not Paid</p>}
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(e) => statusHandler(e, order._id)} value={order.status} >
              <option value="Food Processing ">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
