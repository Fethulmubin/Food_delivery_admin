import React, {useEffect, useState} from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const Add = () => {
    const url = 'http://localhost:9000' 
    const{list, setList} = useContext(StoreContext)
const [image, setImage] = useState(null)
const [ data , setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'salad',
})
const onChangeHandler = (e) => {
    setData({
        ...data,
        [e.target.name]: e.target.value
    })
}
// useEffect(()=>{
//         console.log(data)
// },[data])
const onSubmitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', Number(data.price))
    formData.append('category', data.category)   
    formData.append('image', image)
    const response = await axios.post(`${url}/api/food/add`, formData)
    console.log(response)
    if(response.data.success){
        // alert('Product added successfully')
        setList([...list, response.data.food]);
        setData({
            name: '',
            description: '',
            price: '',
            category: 'salad',
        })
        setImage(null)
        toast.success('product successfully added')
        // toast.success('product successfully added')
    }
    else{
        // alert('Product not added')
        toast.error('something went wrong');
    }

}
  return (
    <div className='add'>
        {/* form to add products */}
        <form className='flex-col' onSubmit={onSubmitHandler} >
            <div className="add-img-upload flex-col">
                <p>Upload image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e) => {setImage(e.target.files[0]);
                console.log(e.target.files[0])}
                } type="file" id='image' hidden required />
            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' required />
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' id="" placeholder='Write content here'>

                </textarea>
            </div>
            <div className="add-category-price flex-col">
                <div className="add-category flex-col">
                    <p>Category</p>
                    <select onChange={onChangeHandler}  name="category" id="" required>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwitch">Sandwitch</option>
                        <option value="Cakes">Cakes</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                        <option value="Pure Veg">Pure Veg</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p> Product Price</p>
                    <input onChange={onChangeHandler} value={data.price} type="number" name='price' required placeholder='$20' />
                </div>
            </div>    
            <button type='submit' className='add-btn'>ADD</button>
        </form>


    </div>
  )
}

export default Add