import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import axios from '../axios-config';
import { login } from '../actions/auth';

const RegisterPage = ({ login }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [message, setMessage] = useState('');

    useEffect(() => {
        setMessage('');
    }, [name, password, confirmPassword])

    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            setMessage('Please fill in your username');
        } else if (!password) {
            setMessage('Please fill in your password');
        } else if (!confirmPassword) {
            setMessage('Please confirm your password');
        } else if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            try {
                const response = await axios.post('/users/register', { name, password });
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                login(response.data);
                history.push('/');
            } catch (e) {
                setMessage(e.message);
            }
        }

    }

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    placeholder="username"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    value={confirmPassword}
                    placeholder="confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button type="submit" variant="contained">
                    Register
                </Button>
                {message && <div className="error alert">{message}</div>}
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    login: (data) => dispatch(login(data))
})

export default connect(undefined, mapDispatchToProps)(RegisterPage);