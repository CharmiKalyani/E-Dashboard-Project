import React from 'react'
import {Navigate,Outlet} from 'react-router-dom';

const PrivateComponent = () => {
    const auth = localStorage.getItem('user');
    return auth?<Outlet/>:<Navigate to = "/signup" />
    // if user is signup thn only the user can able to see the diff pages and the data that is username password is stored in localstorage 
    
}

export default PrivateComponent