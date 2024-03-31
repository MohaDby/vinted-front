import { useState } from "react";

import axios from "axios";

const LoginModal = ({ setLoginModal, setSignupModal, handleToken }) => {
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
      setLoginModal(false);
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        setError("Utilisateur introuvable");
      }
    }
  };

  return (
    <div
      className="modal-root"
      onClick={() => {
        setLoginModal(false);
      }}
    >
      <div
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="close-button">
          <button
            onClick={() => {
              setLoginModal(false);
            }}
          >
            X
          </button>
        </div>

        <div>
          <div className="login-form">
            <h1>Se connecter</h1>
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
              <input
                className="login-submit"
                type="submit"
                value="Se connecter"
                required
              />
            </form>
            <p
              className="redirection-modal"
              onClick={() => {
                setSignupModal(true);
                setLoginModal(false);
              }}
            >
              Pas encore de compte ? Inscris-toi !
            </p>
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
