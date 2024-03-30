import { Link } from "react-router-dom";

const Header = ({ logo, token, handleToken }) => {
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
        {token ? (
          <button
            className="logout-button"
            onClick={() => {
              handleToken(null);
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <div>
            <Link to={"/signup"}>
              <button className="signup-button">S'inscrire</button>
            </Link>
            <Link to={"/login"}>
              <button className="login-button">Se connecter</button>
            </Link>
          </div>
        )}

        <button className="sell-button">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
