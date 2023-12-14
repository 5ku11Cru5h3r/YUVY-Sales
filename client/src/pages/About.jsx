import React from 'react';
import about from "../images/about.jpg";
import Layout from '../components/Layout/Layout';
import "../styles/mainpages.css";
const About = () => {
  return (
    <Layout title={"About us"} >
      <div className="row contactus">
        <div className="col-md-3 ">
          <img
            src={about}
            className='container-fluid m-0'
            alt="contactus"
            id="Img"
          />
        </div>
        <div className="col-md-7">
          <p className="h1 text-light text-justify mt-4">ABOUT US</p>
          <p className="h2 text-light text-justify mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
            Ducimus officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur!<br />
            Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
        </div>
      </div>
    </Layout>
  )
}


export default About