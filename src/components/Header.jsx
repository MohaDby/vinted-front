import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logoVinted.png";

const Header = ({
  token,
  handleToken,
  loginModal,
  setLoginModal,
  signupModal,
  setSignupModal,
  setSearch,
  search,
}) => {
  const navigate = useNavigate();

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
            name={search}
            placeholder="Recherche des articles"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
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

        <button
          className="sell-button"
          onClick={() => {
            if (!token) {
              setLoginModal(!loginModal);
            } else {
              navigate("/publish");
            }
          }}
        >
          Vends tes articles
        </button>
      </div>
    </header>
  );
};

export default Header;
