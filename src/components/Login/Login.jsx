import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../../firebase/firebase.config';
import {Link} from 'react-router-dom'

const auth = getAuth(app);

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then(result => {
                setSuccess('User login successfully')
            }).catch(error => {
                setError(error.message)
            })
    }
    return (
        <div>
            <h4>Please Login</h4>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <div className="form-label">Email</div>
                    <input required onChange={handleChange} value={user.email} type="text" name="email" className="form-control" />
                </div>
                <div className="form-group">
                    <div className="form-label">Password</div>
                    <input required onChange={handleChange} value={user.password} type="password" name="password" className="form-control" />
                </div>
                <div className="button">
                    <button className="btn btn-success mt-2">Login</button>
                </div>
            </form>
            <p>Your are not register user. Please <Link to="/register-rbs">register now</Link></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;