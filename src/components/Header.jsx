import { Link } from "react-router-dom";

const Header = ({ logo }) => {
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
        <div>
          <button className="signup-button">S'inscrire</button>
          <button className="login-button">Se connecter</button>
        </div>
        <button className="sell-button">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
