import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import clapping from "../../images/clapping.gif";
import laughing from "../../images/laughing.gif";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    //form function-Method Patch
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(`${import.meta.env.VITE_SERVER}/api/v1/auth/forgot-password`, {
                email,
                answer,
                newPassword
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    }


    return (
        <Layout title="Update Password - UKA SALES">
            <div className="forgotPassword">
                <form onSubmit={handleSubmit} className="forgotPassword-form">
                    <h3 className="forgotPassword-h3">Update Password</h3>

                    <br />

                    <div className="form-group">
                        <input
                            value={email}
                            onInput={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Please Enter Your Email"
                            className="form-control"
                            required
                        />
                    </div>

                    <br />

                    <div className="form-group">
                        <input
                            value={answer}
                            onInput={(e) => setAnswer(e.target.value)}
                            type="text"
                            placeholder="What Is Your Favorite Song's Name?"
                            className="form-control"
                            required
                        />
                    </div>

                    <br />

                    <div className="form-group">
                        <input
                            value={newPassword}
                            onInput={(e) => setNewPassword(e.target.value)}
                            type="password"
                            placeholder="Enter Your New Password"
                            className="form-control"
                            required
                        />
                    </div>
                    <br />
                    <button type="submit" id="forgotPassword-button" className="auth-button btn btn-primary">
                        Change Password
                    </button>
                </form>
                <img src={clapping} className="clapping" alt="clapping" />
                <img src={laughing} className="laughing" alt="laughing" />
            </div>
        </Layout>
    )
}

export default ForgotPassword