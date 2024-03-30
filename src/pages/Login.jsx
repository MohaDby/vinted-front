import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ handleToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        " https://lereacteur-vinted-api.herokuapp.com/user/login",
        userData
      );
      console.log(response.data);
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        setError("Utilisateur introuvable");
      }
    }
  };

  return (
    <main>
      <div className="container">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Adresse Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <input
              type="text"
              placeholder="Mot de passe"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <input type="submit" value="Se connecter" />
          </form>
          <Link to={"/signup"}>
            <p>Pas encore de compte? Inscris-toi !</p>
          </Link>
          {error && <p>{error}</p>}
        </div>
      </div>
    </main>
  );
};

export default Login;
