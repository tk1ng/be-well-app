import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/authContext';
import styles from './Auth.module.css';

const Auth = () => {
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [password, setPassword] = useState('');
    const [register, setRegister] = useState(true);

    const authContext = useContext(AuthContext);

    const nameChangeHandler = (event) => {
        setNameInput(event.target.value)
    }

    const emailChangeHandler = (event) => {
        setEmailInput(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const endpoint = register ? 'register' : 'login';
        const body = {
            email: emailInput,
            name: nameInput,
            password
        }

        axios.post(`http://localhost:4040/${endpoint}`, body)
            .then(res => {
                const { name, email, id, exp } = res.data;
                const token = res.headers['x-auth-token'];

                console.log('From AUTH', name, res.data);
                authContext.login(token, exp, id, name);

            })
            .catch(err => { console.log(err) })

        setNameInput('');
        setEmailInput('');
        setPassword('');
    }

    const handleClick = () => {
        setRegister(!register);
    }

    return (
        <main className={styles.auth}>
            <h1>APP NAME</h1>
            <form className={styles.authForm} onSubmit={submitHandler}>
                {register && <input
                    className={styles.formInput} type='text' placeholder='Obie Wan' onChange={nameChangeHandler} value={nameInput} />}
                <input
                    className={styles.formInput} type='text' placeholder='name@email.com' value={emailInput} onChange={emailChangeHandler} />
                <input
                    className={styles.formInput} type='text' placeholder='password' value={password} onChange={handlePasswordChange} />
                <button className={styles.formSubmitBtn}>
                    {register ? 'Sign Up' : 'Sign In'}
                </button>
            </form>
            {register ? (
                <div>
                    <p>Already have an account?</p>
                    <button onClick={handleClick} className={styles.formToggle}>Sign In</button>

                </div>) : (
                <div>
                    <p>New User?</p>
                    <button onClick={handleClick} className={styles.formToggle}>Sign Up</button>
                </div>)}
        </main>
    );
}

export default Auth;