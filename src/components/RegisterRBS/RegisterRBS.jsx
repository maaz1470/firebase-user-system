import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, updateProfile } from 'firebase/auth'
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom'
const RegisterRBS = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        userName: ''
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const emailRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess('')
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(response => {
                console.log(response)
                setError('')
                setUser({
                    email: '',
                    password: ''
                })


                setUserName(response.user, user.userName);

                sendVerification(response.user)
                console.log(response.user)


                setSuccess('User has created succcessfully')
            }).catch(error => {
                setError(error.message)

            })
    }

    const sendVerification = (user) => {
        sendEmailVerification(user).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error.message)
        })
    }


    const auth = getAuth(app)


    const handleResetPassword = () => {
        const email = emailRef.current.value;

        if (!emailRef) {
            alert('Please provide your email.')
        } else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    console.log('Reset link send successfully')
                }).catch(error => {
                    setError(error.message)
                })
        }

    }

    const setUserName = (currentUser, name) => {
        updateProfile(currentUser, {
            displayName: name
        }).then(response => {
            console.log('profile name update hoiche')
        }).catch(error => {
            setError(error.message)
        })
    }

    return (
        <div className=''>
            <h4 className='text-primary text-center'>Please Register</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required onChange={handleChange} value={user.userName} name='userName' type="text" placeholder="Enter Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} required onChange={handleChange} value={user.email} name='email' type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required onChange={handleChange} value={user.password} name='password' type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p>Forget your password. <button onClick={handleResetPassword}>reset now</button></p>
            <p>If you are register user. Please <Link to="/login">login now</Link></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default RegisterRBS;