import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [token, setToken] = useState("");

  const handleUserChange = (event) => {
    const value = event.target.value;
    setUser(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleCheckboxChange = (event) => {
    setNewsletter(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email: email,
      username: user,
      password: password,
      newsletter: newsletter,
    };

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        userData
      );

      Cookies.set("userToken", response.data.token);
      setToken(response.data.token);
      navigate("/");

      console.log(token);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <main className="main-signup">
      <div className="container">
        <div className="form">
          <h1>S'inscrire</h1>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Nom d'utilisateur"
              type="text"
              value={user}
              onChange={handleUserChange}
              required
            />
            <input
              placeholder="Email"
              type="text"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <input
              placeholder="Mot de passe"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <div>
              <input
                type="checkbox"
                value={newsletter}
                onChange={handleCheckboxChange}
              />

              <span>S`&apos;`inscrire à notre newsletter</span>
              <div>
                <span>
                  En m'inscrivant je confirme avoir lu et accepté les Termes &
                  Conditions et Politique de Confidentialité de Vinted. Je
                  confirme avoir au moins 18 ans.
                </span>
              </div>
            </div>
            <input type="submit" value="S'inscrire" />
          </form>
          <Link>
            <p>Tu as déja un compte ? Connecte-toi !</p>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Signup;
