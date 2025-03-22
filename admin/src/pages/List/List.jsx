import React, { useContext, useEffect, useState } from 'react'
import './List.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import Spinner from '../../components/Spinner/Spinner'

const List = () => {
  const url = 'http://localhost:9000'
  // const url = 'https://food-delivery-backend-c526.onrender.com'
  const { list, setList } = useContext(StoreContext);
  const [selecttoDelete, setSelecttoDelete] = useState({});
  const [loading, setLoading] = useState(false);

  const removeFood = async (item) => {
    setSelecttoDelete(item)
    //it will optimize your time if you request to backend once
    setLoading(true)
    const response = await axios.post(`${url}/api/food/remove`, { id: item._id })

    if (response.data.success) {
      setList(prev => prev.filter(item => item._id !== item._id))
      setLoading(false);
      toast.success('Deleted successfully')
      selecttoDelete({})
    }
    else {
      toast.error('Something went wrong')
      selecttoDelete({})
      setLoading(false)
    }

  }
// const image_url = 'https://res.cloudinary.com/dezckzjzf/image/upload/v1234567890/uploads/'

  return (
    <div className='list add flex-col' >
      <p>All Foods list</p>
      <div className="list-table">
        <div className="list-table-format  title" >
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category} </p>
              <p >${item.price}</p>
              {loading && selecttoDelete._id  == item._id ? <div className="spinner"> </div> :
                <p onClick={() => removeFood(item)} className='cursor'>X</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List