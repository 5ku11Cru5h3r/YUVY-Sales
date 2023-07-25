import React from 'react';
import '../styles/pnf.css';
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <div className="container pnf">
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1>
              Oops!
            </h1>
            <h2>
              404 Not Found
            </h2>
            <br />
            <div className="error-details">
              Sorry, an error has occured, Requested page not found!
            </div>
            <br />
            <div className="error-actions">
              <Link to="/" className="btn btn-primary button"><span className="glyphicon glyphicon-home" />
                Take Me Home </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Pagenotfound