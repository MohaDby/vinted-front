import { useState } from "react";
import axios from "axios";
const SignupModal = ({ setSignupModal, handleToken, setLoginModal }) => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState("");

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

      console.log(response.data);

      handleToken(response.data.token);

      setSignupModal(false);
    } catch (error) {
      console.log(error.response.data.message);

      if (error.response.data.message === "This email already has an account") {
        setError("Cette adresse e-mail est déjà utilisée");
      }
    }
  };

  return (
    <div
      className="modal-root"
      onClick={() => {
        setSignupModal(false);
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
              setSignupModal(false);
            }}
          >
            X
          </button>
        </div>

        <div>
          <div className="signup-form">
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
                type="email"
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
              <div className="checkbox">
                <div>
                  <input
                    className="checkbox-button"
                    type="checkbox"
                    value={newsletter}
                    onChange={handleCheckboxChange}
                  />
                  <span>S'inscrire à notre newsletter</span>
                </div>
                <span>
                  En m'inscrivant je confirme avoir lu et accepté les Termes &
                  Conditions et Politique de Confidentialité de Vinted. Je
                  confirme avoir au moins 18 ans.
                </span>
              </div>

              <input
                className="signup-submit"
                type="submit"
                value="S'inscrire"
              />
            </form>
            <p
              className="redirection-modal"
              onClick={() => {
                setSignupModal(false);
                setLoginModal(true);
              }}
            >
              Tu as déja un compte ? Connecte-toi !
            </p>
            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
