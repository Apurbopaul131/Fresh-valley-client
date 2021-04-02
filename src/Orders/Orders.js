import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import Header from '../Components/Header/Header';

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState([])
    useEffect(() => {
        fetch('https://whispering-tundra-41421.herokuapp.com/orders?email=' + loggedInUser.email)
            .then(res => res.json())
            .then(data => setOrders(data))

    }, [])
    return (
        <div>
            <Header></Header>
            {
                orders.map(order => <ul>
                    <li> Email:{order.email} Product Name:{order.productName} Price:{order.price}  Order Time:{order.OrderTime}</li>
                </ul>)
            }
        </div>
    );
};

export default Orders;