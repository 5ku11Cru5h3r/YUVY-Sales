import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = ({ path = "login" }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevVal) => --prevVal)
        }, 1000)
        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        })
        return () => clearInterval(interval);
    }, [count, navigate, location, path])

    return (
        <>
            <div
                className='d-flex justify-content-center align-items-center'
                style={{ height: '100vh' }}
            >
                <h1 className="text-center">Redirecting you in {count} second{count != 1 && 's'}...</h1>
                <br />
                <div className="spinner-grow text-primary" role="status">
                </div>
                <div className="spinner-grow text-secondary" role="status">
                </div>
                <div className="spinner-grow text-success" role="status">
                </div>
                <div className="spinner-grow text-danger" role="status">
                </div>
                <div className="spinner-grow text-warning" role="status">
                </div>
                <div className="spinner-grow text-info" role="status">
                </div>
                <div className="spinner-grow text-success" role="status">
                </div>
                <div className="spinner-grow text-dark" role="status">
                </div>

            </div>
        </>

    )
}

export default Spinner