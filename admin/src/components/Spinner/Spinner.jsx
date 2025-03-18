import React from 'react'
import './Spinner.css'
import burgerSpinner from '../../assets/burger_spin.png'


const Spinner = () => {
    return (
        <div className="spinner-container">
            <img src={burgerSpinner} alt="Loading..." className="burger-spinner" />
        </div>
    )
}

export default Spinner