import React, {useEffect, useState} from 'react'
import './Spinner.css'
import burgerSpinner from '../../assets/burger_spin.png'

const Spinner = () => {
      const [message, setMessage] = useState("Mounting your dashboard...");
   
       useEffect(() => {
         const timer = setTimeout(() => {
           setMessage("Almost there...");
         }, 2000); 
     
         return () => clearTimeout(timer);
       }, []);
       return (
           <div className="spinner-container">
               <img src={burgerSpinner} alt="Loading..." className="burger-spinner" />
               <p>{message}</p>
   
           </div>
       )
   }

export default Spinner