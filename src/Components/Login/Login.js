import './Login.css';

import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from 'react';
import firebaseConfig from './firebaseConfig';
import Header from '../Header/Header';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig) }






function Login() {
    
    const [changeUser, setChangeUser] = useState(false);
    const [user, setUser] = useState({
        IsUser: false,

        Name: '',
        email: '',
        password: '',
        Photo: '',
        error: '',
        success: false


    })
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    // const provider = new firebase.auth.GoogleAuthProvider();
    // const handleClicked = () => {
    //     firebase.auth().signInWithPopup(provider)
    //         .then(result => {
    //             const { displayName, email, photoURL } = result.user;
    //             const userData = {
    //                 IsUser: true,
    //                 Name: displayName,
    //                 email: email,
    //                 Password: '',
    //                 Photo: photoURL
    //             }
    //             setUser(userData);
    //             const newThing = {...loggedInUser,userData}
    //             setLoggedInUser(newThing);
    //             history.replace(from);


    //         }
    //         )
    //         .catch(error => {
    //             console.log(error);
    //         })


    // }
    // const handleSignOut = () => {
    //     firebase.auth().signOut()
    //         .then(result => {
    //             const UserOut = {
    //                 IsUser: false,
    //                 Name: '',
    //                 email: '',
    //                 Photo: ''

    //             }
    //             setUser(UserOut);
               
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }
    const handleBlur = (e) => {

        let IsValid = true;
        if (e.target.name === 'email') {
            const formula = /\S+@\S+\.\S+/;
            IsValid = formula.test(e.target.value)

        }
        if (e.target.name === 'password') {
            const Expression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            IsValid = Expression.test(e.target.value);
            //  console.log(IsValid);

        }
        if (IsValid) {
            const newConfirm = { ...user }
            newConfirm[e.target.name] = e.target.value;
            setUser(newConfirm);
            //  console.log(user);


        }
    }
    const handleSubmit = (e) => {


        if (changeUser && user.email && user.password) {

            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    const newConfirm = { ...user }
                    newConfirm.error = '';
                    newConfirm.success = true;
                    setUser(newConfirm);
                    // console.log(newConfirm);
                   const newThing = {...user,...loggedInUser}
                   setLoggedInUser(newThing);
                    history.replace(from);


                    updateUserName(user.Name);



                    // ...
                })
                .catch((error) => {
                    const newConfirm = { ...user };
                    newConfirm.error = error.message;
                    newConfirm.success = false;
                    setUser(newConfirm);


                });
        }


        if (!changeUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    const newConfirm = { ...user }
                    newConfirm.error = '';
                    newConfirm.success = true;
                    setUser(newConfirm);
                    // console.log(newConfirm);
                   const newThing = {...user,...loggedInUser}
                   setLoggedInUser(newThing)
                    history.replace(from);
                    console.log(userCredential.user);

                })
                .catch((error) => {
                    const newConfirm = { ...user };
                    newConfirm.error = error.message;
                    newConfirm.success = false;
                    setUser(newConfirm);
                });
        }


        e.preventDefault();
    }
    const updateUserName = (Name) => {
        console.log(Name);
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: Name

        }).then(function () {
            console.log('User named crated successfully')
        }).catch(function (error) {
            console.log(error);
        });
    }
   
    return (


        <div className="App">
          <Header></Header>

            <h1>complete your authentication</h1>


            <form onSubmit={handleSubmit}>
                <input type="checkbox" name="newUser" onChange={() => setChangeUser(!changeUser)} id="" />
                <label htmlFor="newUser">New user sign in</label>
                <br />
                {
                    changeUser && <input type="text" name="Name" onBlur={handleBlur} placeholder="Enter Your name" required />
                }
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder="Enter Your Email" required />
                <br />
                <input type="password" name="password" onBlur={handleBlur} id="" placeholder="Enter Your Password" required />
                <br />
                <input type="submit" value={changeUser ? 'Sign up' : 'Sing in'} />
            </form>
            <br/>
           
           

            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: "green" }}>User {changeUser ? 'Created' : 'log in'} successfully.</p>
            }


        </div>





    );
}


export default Login;