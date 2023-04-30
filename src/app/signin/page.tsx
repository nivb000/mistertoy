"use client"
import { useState } from 'react';
import { signIn } from "next-auth/react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Signin = () => {

    const [creds, setCreds] = useState({
        username: '',
        password: ''
    })

    const handleChange = ({ target }) => {
        const name = target.name
        const value = target.value
        setCreds(prevCred => ({ ...prevCred, [name]: value }))
    }

    const handleLogin = async (ev: Event) => {
        ev.preventDefault()
        await signIn('credentials', {
            username: creds.username,
            password: creds.password,
            redirect: true,
            callbackUrl: "/"
        })
    }

    const handleDemoLogin = async (ev: Event) => {
        ev.preventDefault()
        await signIn('credentials', {
            username: 'john',
            password: '12345',
            redirect: true,
            callbackUrl: "/"
        })
    }


    return <section className="main-content sign-in">
        <h1>Log in</h1>
        <form className='flex col space-between' onSubmit={handleLogin}>
            <TextField id="standard-basic" label="Username" variant="standard" onChange={handleChange} name="username" />
            <TextField id="standard-basic" label="Password" type='password' variant="standard" onChange={handleChange} name="password" />
            <Button variant="contained" type='submit' color='secondary'>Log in</Button>
            <Button variant="contained" onClick={handleDemoLogin} type='button' color='secondary'>Log in with demo admin</Button>
        </form>
    </section>
}

export default Signin