

import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import './Checkout.css';
const Checkout = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const [cart,setCart]=useState({})
   const {id} = useParams();
   useEffect(()=>{
    fetch(`https://whispering-tundra-41421.herokuapp.com/checkout/${id}`)
    .then(res => res.json())
    .then(data => {
      const product ={
        name:data.name,
        price:data.price,
        photoUrl:data.photoUrl
      }
     setCart(data);
  
    })
   },[id])

  const handleCheckOut = ()=>{
    const Order = {email:loggedInUser.email,productName:cart.name,price:cart.price,OrderTime: new Date() };
    
    fetch('https://whispering-tundra-41421.herokuapp.com/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Order)
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
      })


      
  }


    return (
        <div className="App">
            <Header></Header>
           <img style={{width:'200px',height:'200px'}} src={cart.photoUrl} alt=""/>
           <p>Name:{cart.name}</p>
           <p>Price:{cart.price}</p>
           <button onClick={handleCheckOut} className=" btn btn-primary">CheckOut</button>
        </div>
    );
};

export default Checkout;