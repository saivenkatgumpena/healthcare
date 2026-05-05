import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
           Sometimes people act smoothly and confidently,
           but there are challenges and responsibilities behind it. Problems may arise,
            and handling them requires effort, patience, and understanding. 
            Even though situations can be difficult, with proper work and dedication, things can be managed and improved
            
          </p>
          <p>We are all in 2026!</p>
          <p>We are working on a MERN STACK PROJECT.</p>
          <p>
           We are a dedicated healthcare team committed to providing quality medical
           services with compassion and care. Our mission is to ensure every patient
            receives the right treatment at the right time, 
            supported by experienced doctors and modern technology.
          </p>
          <p>All is well</p>
          <p>let's be fit!</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
