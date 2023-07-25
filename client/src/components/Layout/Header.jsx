import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { TbShoppingCartDiscount } from 'react-icons/tb';
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth({
      ...auth,
      user: null,
      token: ""
    });
    toast.success("Logout Successfully");

  }
  const [auth, setAuth] = useAuth();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand"><TbShoppingCartDiscount />UKA SALES</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link text-dark">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category" className="nav-link">Category</NavLink>
              </li>
              {!auth.user ?
                (<>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link text-muted">Register</NavLink >
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link text-muted">Login</NavLink >
                  </li>
                </>)
                :
                (<>
                  <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle text-muted" id="navbarDropdown" data-bs-toggle="dropdown" role="button" aria-expanded="false">{auth?.user?.name} </NavLink>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                          className="dropdown-item">Dashboard</NavLink>
                      </li>
                      <li>
                        <NavLink onClick={handleLogout} className="dropdown-item"><BiLogOut style={{ fontSize: "24px", paddingBottom: "4px" }} />  Log out</NavLink>
                      </li>
                    </ul>
                  </li>

                </>)}


              <li className="nav-item">
                <NavLink to="/cart" className="nav-link text-dark">Cart (0)</NavLink >
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header