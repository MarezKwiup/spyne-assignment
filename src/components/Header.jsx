import React from "react";
import "./Header.css";
import logoUrl from "../assets/logo.png"

const Header = () => {
  return (
    <div className="header">
      <img src={logoUrl} alt="Logo" className="header-logo" />
      <p className="header-description">Create captions for any video online!</p>
    </div>
  );
};

export default Header;
