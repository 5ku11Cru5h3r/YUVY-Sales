import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import thanos from "../../images/thanos.gif";
import avatar from "../../images/avatar.gif";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Register - UKA SALES">
      <div className="register">
        <form className="register-form" onSubmit={handleSubmit}>
          <h3 className="register-h3">REGISTERATION</h3>
          <div className="form-group">
            <input
              value={name}
              onInput={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter Username"
              required
            />
          </div>
          <br />
          <div className="form-group">
            <input
              value={email}
              onInput={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <br />
          <div className="form-group">
            <input
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Enter The Password"
              required
            />
          </div>
          <br />
          <div className="form-group">
            <input
              value={phone}
              onInput={(e) => setPhone(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <br />
          <div className="form-group">
            <input
              value={answer}
              onInput={(e) => setAnswer(e.target.value)}
              type="text"
              className="form-control"
              placeholder="What Is Your Favorite Song's Name?"
              required
            />
          </div>
          <br />
          <div className="form-group">
            <input
              value={address}
              onInput={(e) => setAddress(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <br />
          <button type="submit" className="auth-button btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
