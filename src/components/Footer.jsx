
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 py-3">
      <div className="container text-center">
        <small>Star Wars  {new Date().getFullYear()}</small>
      </div>
    </footer>
  );
};

export default Footer;