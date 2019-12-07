import React, { useState, useEffect } from 'react';
import { Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { EmailInput, PasswordInput } from '../components/ContainedInput';

// const backgroundImage = '/images/fabian-blank-pElSkGRA2NU-unsplash.jpg';
const backgroundImage = '/images/fabian-blank-pElSkGRA2NU-unsplash-min.jpg';

const useStyles = makeStyles({
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        // background: 'linear-gradient(white, gray)',
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    button: {
        margin: '10px',
    },
});

export default function Login({ history }) {
    const [loaded, setLoaded] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();

    useEffect(() => setLoaded(true));

    async function submit(e) {
        e.preventDefault();
        console.log(email, password);
        const res = await fetch('/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        console.log(res, history);
        if (res.status === 200) history.go('/users/login');
    }

    return (
        <form className={classes.container} onSubmit={e => submit(e)}>
            {loaded ? (
                <div className={classes.background}>
                    <img
                        style={{ display: 'none' }}
                        src={backgroundImage}
                        title="Photo by Fabian Blank on Unsplash"
                    />
                </div>
            ) : null}
            <h2>Login</h2>
            <EmailInput value={email} update={value => setEmail(value)} />
            <PasswordInput value={password} update={value => setPassword(value)} />
            <Button className={classes.button} type="submit" variant="contained" color="primary">
                Login
            </Button>
            <Link href="/users/register">New? Register here</Link>
        </form>
    );
}
