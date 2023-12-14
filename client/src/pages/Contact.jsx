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
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            <br />
            Ducimus officiis obcaecati esse tempore unde ratione, eveniet
            mollitia, perferendis eius temporibus dicta blanditiis doloremque
            explicabo quasi sunt vero optio cum aperiam vel consectetur!
            <br />
            Laborum enim accusantium atque, excepturi sapiente amet! Tenetur
            ducimus aut commodi illum quidem neque tempora nam.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
