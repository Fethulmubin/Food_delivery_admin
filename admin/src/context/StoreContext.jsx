import { createContext, useEffect, useState } from 'react'
// import { food_list } from '../assets/assets/frontend_assets/assets'
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const url = 'http://localhost:9000/'
    const [list, setList] = useState([])
    const [orders, setOrders] = useState([])
    const [customer, setCustomer] = useState(0)
    const [revenue, setRevenue] = useState(0)
    // console.log(cartItems)



    const contexValue = {
        customer,
        setCustomer,
        revenue,
        setRevenue,
        url,
        list,
        setList,
        orders,
        setOrders

    }
    return (
        <StoreContext.Provider value={contexValue}>
            {props.children}
        </StoreContext.Provider>
    )


}
export default StoreContextProvider;
