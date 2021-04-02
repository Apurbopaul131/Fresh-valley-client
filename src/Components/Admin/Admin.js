import React, { useState } from 'react';
import './Admin.css';
import { useForm } from "react-hook-form";
import Home from '../Home/Home';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Header from '../Header/Header';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Admin = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageUrl,setImageUrl] = useState()
 
    const handleOnChange = (event)=>{
        
        const imageData = new FormData();
        imageData.set('key','88200611d5c52029362ff969fc54fe1e');
        imageData.append('image', event.target.files[0]);
        
        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
              console.log(response.data.data.display_url);
            setImageUrl(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    const onSubmit = (data) => {
        const eventData ={
            name:data.name,
            price:data.price,
            photoUrl:imageUrl
        }
        console.log(eventData);
        fetch('https://whispering-tundra-41421.herokuapp.com/addEvent',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(eventData)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })
     };
    
   
    
    return (
        <div className="App">
            <div>
            <Nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Fresh Valley</a>
                <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </Button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to="/home" className="nav-item nav-link">Home</Link>
                        <Link to="/orders" className="nav-item nav-link">Orders</Link>
                        <Link to="/admin" className="nav-item nav-link">Admin</Link>
                        <Link to="/login" className="nav-item nav-link">Login</Link>
                        <Link to="/manage" className="nav-item nav-link">product Manage</Link>
                      
                    </div>
                </div>
            </Nav>
            </div>
            <h1>Create some product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input name="name" defaultValue="Event name" ref={register} />
                <br/>
                <input name="price" defaultValue="Price" ref={register} />
                <br/>
                <input name="exampleRequired" type="file" onChange={handleOnChange} />

                
                <br/>
                <input type="submit" />
            </form>
        </div>
    );
};

export default Admin;