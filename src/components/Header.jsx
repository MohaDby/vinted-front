import { Link } from "react-router-dom";
import React, { useState } from "react";
import Cookies from "js-cookie";

const Header = ({ logo }) => {
  const [token, setToken] = useState("");
  console.log(Cookies.get());

  console.log(token);
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <div>
          <input
            className="searchBar"
            type="text"
            placeholder="Recherche des articles"
          />
        </div>
        <Link to={"/signup"}>
          <button className="signup-button">S'inscrire</button>
        </Link>
        <div>
          <button className="login-button">Se connecter</button>
        </div>
        <button className="sell-button">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
