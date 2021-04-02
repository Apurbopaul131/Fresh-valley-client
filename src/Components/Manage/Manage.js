import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header';
import './Manage.css';



const Manage = () => {
    const [manage,setManage]= useState([]);
useEffect(() => {
    fetch('https://whispering-tundra-41421.herokuapp.com/events')
      .then(res => res.json())
      .then(data => {
        setManage(data);
      })
  }, [])
  const handleDeleteProduct = (id)=>{
    fetch(`https://whispering-tundra-41421.herokuapp.com/delete/${id}`,{
        method: 'DELETE'
    })
    .then(res=>res.json())
    .then(data=>{
        console.log('delete successfully');
    })
  }
    return (
        <div className="App">
           <Header></Header>
           {
               manage.map(product=><p>Product Name:{product.name}   price:{product.price} <button className="btn btn-primary" onClick={()=>handleDeleteProduct(`${product._id}`)}>Delete</button></p>)
           }
        </div>
    );
};

export default Manage;