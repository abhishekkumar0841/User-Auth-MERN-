import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ link ,textToggler }) => {

  return (
    <div>
      <div>
        <Link>
          <p>Forgot Password?</p>
        </Link>
      </div>

      <div>
        <Link to={link}>{textToggler}</Link>
      </div>
    </div>
  );
};

export default Footer;
