import { Link } from "react-router-dom";

const Header = ({
  logo,
  token,
  handleToken,
  loginModal,
  setLoginModal,
  signupModal,
  setSignupModal,
}) => {
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
            <button
              className="signup-button"
              onClick={() => {
                setSignupModal(!signupModal);
              }}
            >
              S'inscrire
            </button>

            <button
              className="login-button"
              onClick={() => {
                setLoginModal(!loginModal);
              }}
            >
              Se connecter
            </button>
          </div>
        )}

        <button className="sell-button">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
