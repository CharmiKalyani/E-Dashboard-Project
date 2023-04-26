import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
// import { useNavigate} from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        // console.warn("Logged out");
        localStorage.clear();
        navigate('/signup');
    }

    return (
        <div>
            <img className='logo' alt='logo'
                src='https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg' />
            {auth ? <ul className='nav-ul'>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/signup">Logout</Link></li>
            </ul>
                :
                <ul className='nav-ul nav-right'>
                    <li> <Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div >
    )
}
export default Nav

// <Link to = "/">Products</Link>   ---> default page will open
// <Link to="/add">Add Product</Link>  ---> Add product page will open like link is created 