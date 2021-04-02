import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import Header from '../Header/Header';
import { Button, Card, CardImg } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
 
 

  const history = useHistory();
  const handleClick = (id) => {
    history.push("/checkout/"+id);

  }
 



  const [allEvent, setAllEvent] = useState([])
  useEffect(() => {
    fetch('https://whispering-tundra-41421.herokuapp.com/events')
      .then(res => res.json())
      .then(data => {
        setAllEvent(data);
      })
  }, [])
  

  return (
    <div>
      <Header></Header>
     
      <div className="row">
        {
          allEvent.map(event => <Card style={{ width: '13rem' }}>
            <CardImg variant="top" style={{ width: '300px', height: '300px' }} src={event.photoUrl} />
            <Card.Body>
              <Card.Title>{event.name}</Card.Title>
              <Card.Text>
                Price:{event.price} Tk.
                  </Card.Text>
              <Button variant="primary" onClick={() => handleClick(`${event._id}`)}>Buy now</Button>
            </Card.Body>
          </Card>)
        }

      </div>
    </div>
  );
};

export default Home;