import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ setLoginModal, setSignupModal, handleToken }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        " https://lereacteur-vinted-api.herokuapp.com/user/login",
        userData
      );
      console.log(response.data);
      handleToken(response.data.token);
      setLoginModal(false);
      navigate("/publish");
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        setError("Utilisateur introuvable !");
      } else if (error.response.status === 401) {
        setError("Mot de passe incorrect !");
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
                name="email"
                type="email"
                placeholder="Adresse Email"
                value={userData.email}
                onChange={handleChange}
                required
              />

              <input
                name="password"
                type="password"
                placeholder="Mot de passe"
                value={userData.password}
                onChange={handleChange}
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
            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
