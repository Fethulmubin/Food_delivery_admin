import React, { useContext, useEffect, useState } from 'react'
import './List.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import Spinner from '../../components/Spinner/Spinner'

const List = () => {
  const url = 'http://localhost:9000'
  const {list, setList} = useContext(StoreContext)
  // const [loadingR, setLoadingR] = useState(false)
  // const [list, setList] = useState([])

  // const fetchList =  async ()=>{
  //   const response = await axios.get(`${url}/api/food/list`);
  //   console.log(response.data.foods)
  //   if(response.data.success){
  //       setList(response.data.foods);
  //   }
  //   else{
  //     toast.error('Error')
  //   }
  // }
  const removeFood = async (foodId) =>{
    // setLoadingR(true)
    //it will optimize your time if you request to backend once
    const response = await axios.post(`${url}/api/food/remove`, {id:foodId})
   
    if(response.data.success){
      setList(prev=>prev.filter(item=>item._id !== foodId))
      // setLoadingR(false);
      toast.success('Deleted successfully')
    }
    else{
      toast.error('Something went wrong')
    }
    // console.log(foodId)
  }
  // console.log("list: ",list)
  // useEffect(()=>{
  //   if(list.length === 0){
  //   fetchList();
  //   }
  // },[list])
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
        { list.map((item, index)=>{
            return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt={item.name}  />
              <p>{item.name}</p>
              <p>{item.category} </p>
              <p >${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div> 
          )
        })}
      </div>
    </div>
  )
}

export default List