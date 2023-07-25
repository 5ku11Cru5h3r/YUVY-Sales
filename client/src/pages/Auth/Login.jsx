import React, { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Layout from '../../components/Layout/Layout';
import "../../styles/AuthStyles.css";
import fortnite from "../../images/fortnite.gif";
import scooby from "../../images/scooby.gif";
import { useAuth } from '../../context/auth';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();



    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/auth/login`, {
                email,
                password
            });
            if (res.data.success) {
                toast.success(res.data.message);
                localStorage.setItem('auth', JSON.stringify(res.data));
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })

                navigate(location.state || "/");

            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!");
        }

    }

    return (
        <Layout title="LOGIN TO- UKA SALES">
            <div className="login">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h3 className="login-h3">WELCOME BACK!</h3>
                    <br />
                    <div className="form-group">
                        <input
                            type="email"
                            value={email}
                            onInput={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter Your Email"
                            required
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <input
                            type="password"
                            value={password}
                            onInput={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder='Enter Password'
                            required
                        />
                    </div>
                    <br />
                    <button type="submit" className="auth-button btn btn-primary">
                        Login
                    </button>
                    <Link to="/forgot-password" className="ms-5">Forgot Password?</Link>
                </form>
            </div>
            <img src={fortnite} className="fortnite" alt="fortnite" />
            <img src={scooby} className="scooby" alt="scooby" />
        </Layout>

    )
}

export default Login