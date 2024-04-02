import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
const SignupModal = ({ setSignupModal, handleToken, setLoginModal }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null,
    newsletter: false,
  });
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setUserData((prevUserData) => ({
      ...prevUserData,
      avatar: file,
    }));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("newsletter", userData.newsletter);

    if (userData.avatar) {
      formData.append("avatar", userData.avatar);
    }

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
                name="username"
                placeholder="Nom d'utilisateur"
                type="text"
                value={userData.username}
                onChange={handleChange}
                required
              />
              <div {...getRootProps()} className="add-avatar">
                <input {...getInputProps()} />
                <p>Ajoute un avatar</p>
              </div>
              <input
                name="email"
                placeholder="Email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
              <input
                name="password"
                placeholder="Mot de passe"
                type="password"
                value={userData.password}
                onChange={handleChange}
                required
              />
              <div className="checkbox">
                <div>
                  <input
                    name="newsletter"
                    className="checkbox-button"
                    type="checkbox"
                    value={userData.newsletter}
                    onChange={handleChange}
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
