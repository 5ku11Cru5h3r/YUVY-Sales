import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [auth, setAuth] = useAuth();

  const autofill = () => {
    setName(auth?.user?.name);
    setEmail(auth?.user?.email);
    setPhone(auth?.user?.phone);
    setAddress(auth?.user?.address);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch("/api/v1/auth/profile", {
        name,
        email,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.message);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    autofill();
  }, []);
  return (
    <Layout title={"My Profile - UKA SALES"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit}>
              <h3>User Profile</h3>
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
                  disabled
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
                  value={address}
                  onInput={(e) => setAddress(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Address"
                  required
                />
              </div>
              <br />
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
