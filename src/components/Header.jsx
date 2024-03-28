import { Link } from "react-router-dom";

const Header = ({ logo }) => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>

        <div>
          <input type="text" placeholder="Recherche des articles" />
        </div>
        <div>
          <button>S'inscrire</button>
          <button>Se connecter</button>
        </div>
        <button>Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
