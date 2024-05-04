import React from "react";
import contact from "../images/contact.jpg";
import "../styles/mainpages.css";
import Layout from "../components/Layout/Layout";

const Contact = () => {
  return (
    <Layout title={"Contact Us"} author={"UKA"}>
      <div className="row contactus">
        <div className="col-md-3 ">
          <img
            src={contact}
            className="container-fluid m-0"
            alt="contactus"
            id="Img"
          />
        </div>
        <div className="col-md-7">
          <p className="h1 text-light text-justify mt-4">CONTACT US</p>
          <p className="h2 text-light text-justify mt-4">
You may contact us using the information below:
<br/>
Merchant Legal entity name: UNNAT KUMAR AGARWAL<br/>
Registered Address: JSSATE, Sector 62, Noida, Uttar Pradesh, PIN: 201301<br/>
Operational Address: JSSATE, Sector 62, Noida, Uttar Pradesh, PIN: 201301<br/>
Telephone No: 9118237337<br/>
E-Mail ID: devolopkingbro@gmail.com<br/>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
